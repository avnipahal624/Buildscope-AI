import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { AppScreen } from '../types';

interface SpatialStudio3DViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
  onOpenJournal?: () => void;
}

// Scratch math helpers outside render loop to prevent garbage collection
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _matrix = new THREE.Matrix4();
const _color = new THREE.Color();

export const SpatialStudio3DView: React.FC<SpatialStudio3DViewProps> = ({
  onNavigate,
  onShowToast,
  onOpenJournal
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Studio Interactive States
  const [explodedRatio, setExplodedRatio] = useState(0);
  const [isAugerActive, setIsAugerActive] = useState(false);
  const [activeFinish, setActiveFinish] = useState<'carbon' | 'titanium' | 'gold'>('carbon');
  const [activeCameraPreset, setActiveCameraPreset] = useState<'orbit' | 'dart' | 'top' | 'sensor'>('orbit');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);

  // Mutable refs for animation loop
  const explodedRef = useRef(0);
  const augerRef = useRef(0);
  const finishRef = useRef(activeFinish);
  const wireframeRef = useRef(wireframeMode);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    explodedRef.current = explodedRatio;
  }, [explodedRatio]);

  useEffect(() => {
    augerRef.current = isAugerActive ? 1 : 0;
  }, [isAugerActive]);

  useEffect(() => {
    finishRef.current = activeFinish;
  }, [activeFinish]);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let animationFrameId: number;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere (Horizon Fog matched to background #121318)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x121318);
    scene.fog = new THREE.FogExp2(0x121318, 0.024);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(6.5, 4.2, 7.5);
    _targetCamPos.copy(camera.position);
    _targetLookAt.set(0, 0.8, 0);

    // 3. Renderer with ACESFilmic Tone Mapping & Studio Environment
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Environment map via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig: Warm Key vs Cool Fill
    const warmKeyLight = new THREE.DirectionalLight(0xfff1dc, 2.4);
    warmKeyLight.position.set(7, 10, 5);
    warmKeyLight.castShadow = true;
    warmKeyLight.shadow.mapSize.width = 2048;
    warmKeyLight.shadow.mapSize.height = 2048;
    warmKeyLight.shadow.bias = -0.0004;
    warmKeyLight.shadow.normalBias = 0.02;
    warmKeyLight.shadow.camera.near = 0.5;
    warmKeyLight.shadow.camera.far = 25;
    const d = 5;
    warmKeyLight.shadow.camera.left = -d;
    warmKeyLight.shadow.camera.right = d;
    warmKeyLight.shadow.camera.top = d;
    warmKeyLight.shadow.camera.bottom = -d;
    scene.add(warmKeyLight);

    const coolFillLight = new THREE.HemisphereLight(0xc6d8f5, 0x121318, 0.8);
    scene.add(coolFillLight);

    const rimLight = new THREE.DirectionalLight(0xf4be65, 1.2);
    rimLight.position.set(-6, 3, -6);
    scene.add(rimLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.8, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.08;
    controls.minDistance = 2.5;
    controls.maxDistance = 16;
    controlsRef.current = controls;

    // 6. Procedural Textures (Carbon Weave & Contact Shadow)
    const createProceduralCarbonTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#1c1d22';
      ctx.fillRect(0, 0, 128, 128);

      ctx.fillStyle = '#282930';
      for (let i = 0; i < 128; i += 16) {
        for (let j = 0; j < 128; j += 16) {
          if ((i + j) % 32 === 0) {
            ctx.fillRect(i, j, 16, 16);
          }
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 12);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const createContactShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const carbonTex = createProceduralCarbonTexture();
    const shadowTex = createContactShadowTexture();

    // 7. Ground Grid & Contact Shadow Plane (Flush with ground, no floating)
    const groundGrid = new THREE.GridHelper(30, 30, 0x4f4537, 0x1e1f24);
    groundGrid.position.y = 0;
    scene.add(groundGrid);

    const shadowPlaneGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // 8. Shared Material Library with physical roughness & metalness variance
    const materials = {
      carbon: new THREE.MeshStandardMaterial({
        map: carbonTex,
        roughness: 0.35,
        metalness: 0.25,
        color: 0x222329
      }),
      titanium: new THREE.MeshStandardMaterial({
        roughness: 0.18,
        metalness: 0.92,
        color: 0xd4d8df
      }),
      goldAccent: new THREE.MeshStandardMaterial({
        roughness: 0.22,
        metalness: 0.95,
        color: 0xf4be65
      }),
      dartSteel: new THREE.MeshStandardMaterial({
        roughness: 0.15,
        metalness: 0.96,
        color: 0x9fa4af
      }),
      glassLens: new THREE.MeshPhysicalMaterial({
        roughness: 0.05,
        transmission: 0.95,
        thickness: 0.8,
        ior: 1.52,
        transparent: true,
        opacity: 0.9
      }),
      propellerMat: new THREE.MeshStandardMaterial({
        roughness: 0.4,
        metalness: 0.3,
        color: 0x1a1a20
      }),
      warningRed: new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 0.6,
        color: 0x93000a
      })
    };

    // 9. Hero Subject: 3–12 Part Procedural Assembly (THREE.Group)
    const droneMasterGroup = new THREE.Group();
    droneMasterGroup.position.y = 0.22; // Pivoted flush with landing skids on ground
    scene.add(droneMasterGroup);

    // Part 1: Central Monocoque Fuselage Pod (Primary Silhouette)
    const fuselageGroup = new THREE.Group();
    const fuselageShape = new THREE.Shape();
    fuselageShape.moveTo(-0.6, -0.9);
    fuselageShape.lineTo(0.6, -0.9);
    fuselageShape.lineTo(0.85, 0.4);
    fuselageShape.lineTo(0.0, 1.2); // Tapered nose
    fuselageShape.lineTo(-0.85, 0.4);
    fuselageShape.closePath();

    const extrudeSettings = {
      depth: 0.55,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12
    };

    const fuselageGeo = new THREE.ExtrudeGeometry(fuselageShape, extrudeSettings);
    fuselageGeo.center();
    const fuselageMesh = new THREE.Mesh(fuselageGeo, materials.carbon);
    fuselageMesh.rotation.x = Math.PI / 2;
    fuselageMesh.position.y = 0.9;
    fuselageMesh.castShadow = true;
    fuselageMesh.receiveShadow = true;
    fuselageGroup.add(fuselageMesh);

    // Top Avionics Shield Canopy
    const canopyGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.16, 16);
    const canopyMesh = new THREE.Mesh(canopyGeo, materials.titanium);
    canopyMesh.position.set(0, 1.25, 0);
    canopyMesh.castShadow = true;
    fuselageGroup.add(canopyMesh);

    droneMasterGroup.add(fuselageGroup);

    // Part 2: Carbon Quad Booms & Motor Nacelles (Secondary Read)
    const boomsGroup = new THREE.Group();
    const boomAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    const rotorHubs: THREE.Group[] = [];

    boomAngles.forEach((angle, index) => {
      const boomArm = new THREE.Group();
      boomArm.rotation.y = angle;

      // Carbon Boom Tube
      const tubeGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 12);
      const tubeMesh = new THREE.Mesh(tubeGeo, materials.carbon);
      tubeMesh.rotation.z = Math.PI / 2;
      tubeMesh.position.set(1.1, 0.95, 0);
      tubeMesh.castShadow = true;
      boomArm.add(tubeMesh);

      // Motor Nacelle Bell (Titanium + Gold Accent)
      const motorBaseGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.28, 16);
      const motorBase = new THREE.Mesh(motorBaseGeo, materials.titanium);
      motorBase.position.set(2.2, 1.05, 0);
      motorBase.castShadow = true;
      boomArm.add(motorBase);

      const motorCapGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.12, 16);
      const motorCap = new THREE.Mesh(motorCapGeo, materials.goldAccent);
      motorCap.position.set(2.2, 1.24, 0);
      boomArm.add(motorCap);

      // Dual Propeller Blades
      const rotorHub = new THREE.Group();
      rotorHub.position.set(2.2, 1.32, 0);

      const bladeGeo = new THREE.BoxGeometry(1.6, 0.02, 0.14);
      const blade1 = new THREE.Mesh(bladeGeo, materials.propellerMat);
      blade1.castShadow = true;
      rotorHub.add(blade1);

      const blade2 = new THREE.Mesh(bladeGeo, materials.propellerMat);
      blade2.rotation.y = Math.PI / 2;
      blade2.castShadow = true;
      rotorHub.add(blade2);

      boomArm.add(rotorHub);
      rotorHubs.push(rotorHub);
      boomsGroup.add(boomArm);
    });

    droneMasterGroup.add(boomsGroup);

    // Part 3: High-Pressure Soil Dart Launcher (DARPA §4.2 Solenoid Unit)
    const dartLauncherGroup = new THREE.Group();
    dartLauncherGroup.position.set(0, 0.5, 0.1);

    // Main Cylindrical Pneumatic Reservoir
    const reservoirGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.9, 20);
    const reservoirMesh = new THREE.Mesh(reservoirGeo, materials.dartSteel);
    reservoirMesh.castShadow = true;
    dartLauncherGroup.add(reservoirMesh);

    // Valve Gauge Ring with Accent
    const valveRingGeo = new THREE.TorusGeometry(0.26, 0.035, 12, 24);
    const valveRing = new THREE.Mesh(valveRingGeo, materials.goldAccent);
    valveRing.rotation.x = Math.PI / 2;
    valveRing.position.y = 0.2;
    dartLauncherGroup.add(valveRing);

    // Tungsten Penetrator Spike Tip
    const spikeGeo = new THREE.ConeGeometry(0.12, 0.5, 16);
    const spikeMesh = new THREE.Mesh(spikeGeo, materials.dartSteel);
    spikeMesh.position.y = -0.65;
    spikeMesh.rotation.x = Math.PI;
    spikeMesh.castShadow = true;
    dartLauncherGroup.add(spikeMesh);

    droneMasterGroup.add(dartLauncherGroup);

    // Part 4: Rotary Pre-drill Auger (Protocol B-2 Fallback Unit)
    const augerGroup = new THREE.Group();
    augerGroup.position.set(0.35, 0.45, -0.2);

    // Helical CatmullRomCurve3 for Auger Drill Bit
    const helixPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64;
      const angle = t * Math.PI * 2 * 3.5;
      const radius = 0.1;
      helixPoints.push(new THREE.Vector3(Math.cos(angle) * radius, -t * 0.8, Math.sin(angle) * radius));
    }
    const helixCurve = new THREE.CatmullRomCurve3(helixPoints);
    const augerGeo = new THREE.TubeGeometry(helixCurve, 64, 0.03, 10, false);
    const augerMesh = new THREE.Mesh(augerGeo, materials.goldAccent);
    augerMesh.castShadow = true;
    augerGroup.add(augerMesh);

    // Auger Drive Motor
    const augerMotorGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.35, 16);
    const augerMotor = new THREE.Mesh(augerMotorGeo, materials.titanium);
    augerMotor.position.y = 0.15;
    augerGroup.add(augerMotor);

    droneMasterGroup.add(augerGroup);

    // Part 5: Gimbaled Botanical LiDAR & Stereo Optical Sensor Turret
    const turretGroup = new THREE.Group();
    turretGroup.position.set(0, 0.72, 1.15); // Mounted on forward nose

    const turretBallGeo = new THREE.SphereGeometry(0.24, 20, 20);
    const turretBall = new THREE.Mesh(turretBallGeo, materials.titanium);
    turretBall.castShadow = true;
    turretGroup.add(turretBall);

    // Sapphire Optical Lens
    const lensRingGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const lensRing = new THREE.Mesh(lensRingGeo, materials.goldAccent);
    lensRing.rotation.x = Math.PI / 2;
    lensRing.position.z = 0.22;
    turretGroup.add(lensRing);

    const lensGlassGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16);
    const lensGlass = new THREE.Mesh(lensGlassGeo, materials.glassLens);
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.z = 0.26;
    turretGroup.add(lensGlass);

    droneMasterGroup.add(turretGroup);

    // Part 6: Carbon Landing Skids (Flush with ground plane)
    const landingGroup = new THREE.Group();
    const skidGeo = new THREE.BoxGeometry(0.12, 0.06, 2.8);
    const leftSkid = new THREE.Mesh(skidGeo, materials.carbon);
    leftSkid.position.set(-0.85, -0.19, 0);
    leftSkid.castShadow = true;
    landingGroup.add(leftSkid);

    const rightSkid = new THREE.Mesh(skidGeo, materials.carbon);
    rightSkid.position.set(0.85, -0.19, 0);
    rightSkid.castShadow = true;
    landingGroup.add(rightSkid);

    // Struts linking fuselage to skids
    const strutGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
    [-0.7, 0.7].forEach((zPos) => {
      const leftStrut = new THREE.Mesh(strutGeo, materials.titanium);
      leftStrut.position.set(-0.55, 0.3, zPos);
      leftStrut.rotation.z = Math.PI / 6;
      leftStrut.castShadow = true;
      landingGroup.add(leftStrut);

      const rightStrut = new THREE.Mesh(strutGeo, materials.titanium);
      rightStrut.position.set(0.55, 0.3, zPos);
      rightStrut.rotation.z = -Math.PI / 6;
      rightStrut.castShadow = true;
      landingGroup.add(rightStrut);
    });

    droneMasterGroup.add(landingGroup);

    // 10. InstancedMesh for 80 Spatial Telemetry Data Nodes (Floating Canopy Cloud)
    const nodeCount = 80;
    const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xf4be65,
      emissive: 0x573a00,
      roughness: 0.2,
      metalness: 0.8
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const nodeOffsets: { x: number; y: number; z: number; speed: number; angle: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.5 + Math.random() * 5.5;
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random();
      const height = 0.5 + Math.random() * 4.5;
      nodeOffsets.push({
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius,
        speed: 0.2 + Math.random() * 0.4,
        angle
      });
      _matrix.setPosition(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      instancedNodes.setMatrixAt(i, _matrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    scene.add(instancedNodes);

    // 11. Lossless 60fps Loop with Frame-Rate Independent Exponential Damping
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping factor for smooth cinematic movements
      const dampK = 1 - Math.exp(-5 * delta);

      // Spin propellers continuously
      rotorHubs.forEach((hub, i) => {
        hub.rotation.y += (i % 2 === 0 ? 1 : -1) * delta * 16;
      });

      // Animate Turret subtle scanning yaw
      turretGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.45;
      turretGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;

      // Handle Exploded View separation smoothly with exponential damp
      const expTarget = explodedRef.current;
      fuselageGroup.position.y = THREE.MathUtils.damp(fuselageGroup.position.y, 0 + expTarget * 1.4, 6, delta);
      dartLauncherGroup.position.y = THREE.MathUtils.damp(dartLauncherGroup.position.y, 0.5 - expTarget * 1.2, 6, delta);
      turretGroup.position.z = THREE.MathUtils.damp(turretGroup.position.z, 1.15 + expTarget * 1.0, 6, delta);
      boomsGroup.position.y = THREE.MathUtils.damp(boomsGroup.position.y, 0 + expTarget * 0.6, 6, delta);
      landingGroup.position.y = THREE.MathUtils.damp(landingGroup.position.y, 0 - expTarget * 0.8, 6, delta);

      // Handle Auger Fallback Protocol B-2 dynamic extension & rotation
      const augerTarget = augerRef.current;
      augerGroup.position.y = THREE.MathUtils.damp(augerGroup.position.y, 0.45 - augerTarget * 0.55, 6, delta);
      if (augerTarget > 0.1) {
        augerGroup.rotation.y += delta * 12; // 185 RPM simulated drilling
      }

      // Update Material Finish dynamically
      const activeFinishVal = finishRef.current;
      if (activeFinishVal === 'gold') {
        fuselageMesh.material = materials.goldAccent;
      } else if (activeFinishVal === 'titanium') {
        fuselageMesh.material = materials.titanium;
      } else {
        fuselageMesh.material = materials.carbon;
      }

      // Update wireframe mode
      materials.carbon.wireframe = wireframeRef.current;
      materials.titanium.wireframe = wireframeRef.current;
      materials.dartSteel.wireframe = wireframeRef.current;

      // Orbiting spatial telemetry nodes in instanced cloud
      for (let i = 0; i < nodeCount; i++) {
        const item = nodeOffsets[i];
        item.angle += delta * item.speed * 0.3;
        const currentRadius = Math.sqrt(item.x * item.x + item.z * item.z);
        const newX = Math.cos(item.angle) * currentRadius;
        const newZ = Math.sin(item.angle) * currentRadius;
        const hoverY = item.y + Math.sin(elapsedTime * 2 + i) * 0.1;
        _matrix.setPosition(newX, hoverY, newZ);
        instancedNodes.setMatrixAt(i, _matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;

      // Smooth Camera Interpolation for presets
      camera.position.lerp(_targetCamPos, dampK);
      controls.target.lerp(_targetLookAt, dampK);
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // 12. Responsive Resize Handling
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Camera Presets handler
  const setCameraPreset = (preset: 'orbit' | 'dart' | 'top' | 'sensor') => {
    setActiveCameraPreset(preset);
    if (preset === 'orbit') {
      _targetCamPos.set(6.5, 4.2, 7.5);
      _targetLookAt.set(0, 0.8, 0);
      onShowToast('Switched to Orbit Isometric View');
    } else if (preset === 'dart') {
      _targetCamPos.set(1.8, 0.6, 2.2);
      _targetLookAt.set(0, 0.3, 0);
      onShowToast('Focused on 3.2 MPa Dart Solenoid Launcher');
    } else if (preset === 'top') {
      _targetCamPos.set(0.01, 10.5, 0.01);
      _targetLookAt.set(0, 0, 0);
      onShowToast('Switched to Top-Down Aerodynamic CAD View');
    } else if (preset === 'sensor') {
      _targetCamPos.set(0.6, 1.4, 2.8);
      _targetLookAt.set(0, 0.8, 1.15);
      onShowToast('Focused on Botanical LiDAR & Optical Array');
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#121318] overflow-hidden select-none animate-fade-in-up">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Minimal Spec Title Badge (Solid dark surface, no backdrop-filter over WebGL) */}
      <div className="absolute top-16 left-3 sm:left-6 z-20 pointer-events-auto bg-[#1a1b20] border border-[#4f4537]/50 rounded-lg p-3 shadow-xl max-w-xs">
        <div className="flex items-center gap-1.5 text-[#f4be65] text-[10px] font-label-spatial font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[15px]">deployed_code</span>
          <span>BuildScope 3D Core Engine</span>
        </div>
        <h1 className="font-headline-sm text-sm sm:text-base text-[#e3e2e8] mt-0.5">
          Boreal-Dart v2.4 (Folio #884-DS)
        </h1>
        <p className="text-[11px] font-label-spatial text-[#bfcbac] mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
          <span>Studio PBR Lighting · 60 FPS Lossless Loop</span>
        </p>
      </div>

      {/* Top Right: View Switcher / Return button */}
      <div className="absolute top-16 right-3 sm:right-6 z-20 pointer-events-auto flex items-center gap-2">
        {onOpenJournal && (
          <button
            type="button"
            onClick={onOpenJournal}
            className="px-3 py-1.5 rounded bg-[#1a1b20] border border-[#f4be65]/50 text-[#f4be65] hover:bg-[#292a2f] text-xs font-label-spatial flex items-center gap-1 cursor-pointer shadow-lg"
            title="Open Live Spatial Activity Journal"
          >
            <span className="material-symbols-outlined text-[15px]">history_edu</span>
            <span>Journal</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac] animate-pulse" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-3 py-1.5 rounded text-xs font-label-spatial border transition-colors cursor-pointer shadow-lg ${
            wireframeMode
              ? 'bg-[#d6a34d] text-[#281900] border-[#f4be65]'
              : 'bg-[#1a1b20] text-[#d3c4b2] border-[#4f4537]/50 hover:text-[#f4be65]'
          }`}
          title="Toggle Wireframe CAD Mode"
        >
          CAD Wireframe
        </button>
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="px-3 py-1.5 rounded bg-[#1a1b20] border border-[#4f4537]/50 text-[#e3e2e8] hover:text-[#f4be65] hover:border-[#f4be65] text-xs font-label-tag flex items-center gap-1 cursor-pointer shadow-lg"
        >
          <span className="material-symbols-outlined text-[15px]">dashboard</span>
          <span>Dashboard</span>
        </button>
      </div>

      {/* Unified Bottom Control Dock (Consolidated, <= 15% Viewport Footprint, solid rgba surfaces, no backdrop-filter over WebGL) */}
      <div
        className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 w-[95%] max-w-3xl pointer-events-auto ${
          isControlsCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-4 py-1.5 rounded-t-lg bg-[#1e1f24] border-t border-x border-[#4f4537]/60 text-xs font-label-spatial text-[#f4be65] hover:bg-[#292a2f] cursor-pointer flex items-center gap-1 shadow-md"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isControlsCollapsed ? 'expand_less' : 'expand_more'}
            </span>
            <span>{isControlsCollapsed ? 'Show 3D Engineering Controls' : 'Hide Controls (Zen Mode)'}</span>
          </button>
        </div>

        {/* Floating Dock Body (Solid dark charcoal surface, <= 15% viewport) */}
        <div className="bg-[#1a1b20] border border-[#4f4537]/60 rounded-xl p-3 sm:p-4 shadow-2xl space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            {/* Control 1: Exploded View Separation Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-label-spatial">
                <span className="text-[#d3c4b2] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#f4be65]">layers</span>
                  <span>Exploded View</span>
                </span>
                <span className="text-[#f4be65] font-bold">{Math.round(explodedRatio * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedRatio}
                onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                className="w-full accent-[#d6a34d] bg-[#0d0e13] h-2 rounded cursor-pointer"
              />
            </div>

            {/* Control 2: Fallback Protocol B-2 Auger Switch */}
            <div className="flex items-center justify-between p-2 rounded bg-[#0d0e13] border border-[#4f4537]/40 text-xs">
              <div className="space-y-0.5">
                <span className="font-label-spatial text-[10px] text-[#bfcbac] block font-bold">
                  PROTOCOL B-2 PRE-DRILL
                </span>
                <span className="text-[11px] text-[#e3e2e8]">
                  {isAugerActive ? 'Rotary Auger Deployed' : 'Dart Solenoid Only'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !isAugerActive;
                  setIsAugerActive(next);
                  onShowToast(
                    next
                      ? 'Protocol B-2 Rotary Pre-Drill deployed'
                      : 'Retracted to Primary Solenoid'
                  );
                }}
                className={`px-3 py-1.5 rounded font-label-tag text-xs font-bold transition-all cursor-pointer ${
                  isAugerActive
                    ? 'bg-[#a4b092] text-[#151e0a]'
                    : 'bg-[#292a2f] text-[#d3c4b2] hover:text-[#f4be65]'
                }`}
              >
                {isAugerActive ? 'Active' : 'Deploy B-2'}
              </button>
            </div>

            {/* Control 3: Material Finish Swatches */}
            <div className="space-y-1">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e] block">
                SURFACE FINISH
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFinish('carbon');
                    onShowToast('Finish: Matte Carbon Fiber');
                  }}
                  className={`py-1 text-[11px] rounded font-label-tag border transition-all cursor-pointer ${
                    activeFinish === 'carbon'
                      ? 'bg-[#292a2f] text-[#f4be65] border-[#f4be65]'
                      : 'bg-[#0d0e13] text-[#d3c4b2] border-[#4f4537]/30'
                  }`}
                >
                  Carbon
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFinish('titanium');
                    onShowToast('Finish: Brushed Titanium');
                  }}
                  className={`py-1 text-[11px] rounded font-label-tag border transition-all cursor-pointer ${
                    activeFinish === 'titanium'
                      ? 'bg-[#292a2f] text-[#f4be65] border-[#f4be65]'
                      : 'bg-[#0d0e13] text-[#d3c4b2] border-[#4f4537]/30'
                  }`}
                >
                  Titanium
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFinish('gold');
                    onShowToast('Finish: Atelier Imperial Gold');
                  }}
                  className={`py-1 text-[11px] rounded font-label-tag border transition-all cursor-pointer ${
                    activeFinish === 'gold'
                      ? 'bg-[#292a2f] text-[#f4be65] border-[#f4be65]'
                      : 'bg-[#0d0e13] text-[#d3c4b2] border-[#4f4537]/30'
                  }`}
                >
                  Gold
                </button>
              </div>
            </div>
          </div>

          {/* Camera View Pills Strip */}
          <div className="flex items-center justify-between pt-2 border-t border-[#4f4537]/30 flex-wrap gap-2 text-xs">
            <span className="font-label-spatial text-[10px] text-[#9c8f7e]">CAMERA PRESETS:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setCameraPreset('orbit')}
                className={`px-2.5 py-1 rounded text-[11px] font-label-spatial cursor-pointer transition-all ${
                  activeCameraPreset === 'orbit'
                    ? 'bg-[#d6a34d] text-[#281900] font-bold'
                    : 'bg-[#0d0e13] text-[#d3c4b2] hover:text-[#f4be65]'
                }`}
              >
                Orbit 45°
              </button>
              <button
                type="button"
                onClick={() => setCameraPreset('dart')}
                className={`px-2.5 py-1 rounded text-[11px] font-label-spatial cursor-pointer transition-all ${
                  activeCameraPreset === 'dart'
                    ? 'bg-[#d6a34d] text-[#281900] font-bold'
                    : 'bg-[#0d0e13] text-[#d3c4b2] hover:text-[#f4be65]'
                }`}
              >
                Dart Solenoid
              </button>
              <button
                type="button"
                onClick={() => setCameraPreset('sensor')}
                className={`px-2.5 py-1 rounded text-[11px] font-label-spatial cursor-pointer transition-all ${
                  activeCameraPreset === 'sensor'
                    ? 'bg-[#d6a34d] text-[#281900] font-bold'
                    : 'bg-[#0d0e13] text-[#d3c4b2] hover:text-[#f4be65]'
                }`}
              >
                LiDAR Array
              </button>
              <button
                type="button"
                onClick={() => setCameraPreset('top')}
                className={`px-2.5 py-1 rounded text-[11px] font-label-spatial cursor-pointer transition-all ${
                  activeCameraPreset === 'top'
                    ? 'bg-[#d6a34d] text-[#281900] font-bold'
                    : 'bg-[#0d0e13] text-[#d3c4b2] hover:text-[#f4be65]'
                }`}
              >
                Top-Down CAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
