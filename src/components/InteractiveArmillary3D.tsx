import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HOTLINKED_ASSETS, SPATIAL_CORE_NODES } from '../data/mockData';
import { SpatialNode } from '../types';

interface InteractiveArmillary3DProps {
  onSelectNode: (node: SpatialNode) => void;
  activeNodeId?: string;
}

export const InteractiveArmillary3D: React.FC<InteractiveArmillary3DProps> = ({
  onSelectNode,
  activeNodeId
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for armillary sphere
    const armillaryGroup = new THREE.Group();
    scene.add(armillaryGroup);

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.9);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xf4be65, 3.5, 30);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Create concentric brass/gold rings
    const ringMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0xd6a34d,
        metalness: 0.85,
        roughness: 0.25,
        wireframe: false
      }),
      new THREE.MeshStandardMaterial({
        color: 0xf4bd65,
        metalness: 0.9,
        roughness: 0.3,
        wireframe: false
      }),
      new THREE.MeshStandardMaterial({
        color: 0x9c8f7e,
        metalness: 0.7,
        roughness: 0.4,
        wireframe: false
      })
    ];

    const rings: THREE.Mesh[] = [];

    // Outer gimbal ring
    const ringGeo1 = new THREE.TorusGeometry(6.2, 0.08, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMaterials[0]);
    armillaryGroup.add(ring1);
    rings.push(ring1);

    // Mid tilted ring 1
    const ringGeo2 = new THREE.TorusGeometry(5.4, 0.07, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMaterials[1]);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    armillaryGroup.add(ring2);
    rings.push(ring2);

    // Mid tilted ring 2
    const ringGeo3 = new THREE.TorusGeometry(4.6, 0.06, 16, 100);
    const ring3 = new THREE.Mesh(ringGeo3, ringMaterials[0]);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 4;
    armillaryGroup.add(ring3);
    rings.push(ring3);

    // Inner equator ring with tick marks
    const ringGeo4 = new THREE.TorusGeometry(3.8, 0.06, 16, 100);
    const ring4 = new THREE.Mesh(ringGeo4, ringMaterials[2]);
    ring4.rotation.y = Math.PI / 2;
    armillaryGroup.add(ring4);
    rings.push(ring4);

    // Central warm glowing filament core
    const coreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffd580,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    armillaryGroup.add(coreMesh);

    // Tiny orbiting particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf4bd65,
      size: 0.12,
      transparent: true,
      opacity: 0.75
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    armillaryGroup.add(particleSystem);

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let animationFrameId: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      armillaryGroup.rotation.y += deltaX * 0.008;
      armillaryGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      armillaryGroup.rotation.y += deltaX * 0.01;
      armillaryGroup.rotation.x += deltaY * 0.01;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        armillaryGroup.rotation.y += 0.003;
        ring1.rotation.z += 0.002;
        ring2.rotation.y -= 0.004;
        ring3.rotation.x += 0.003;
      }

      particleSystem.rotation.y += 0.001;

      // Pulsing core effect
      const time = Date.now() * 0.002;
      const scale = 1 + Math.sin(time) * 0.08;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square bg-[#0D0E13] flex items-center justify-center overflow-hidden rounded-lg select-none">
      {/* Three.js interactive canvas overlay */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Armillary sphere visual artwork backdrop */}
      <img
        alt="BuildScope AI 3D Project Core Armillary Sphere"
        className="absolute inset-0 w-full h-full object-contain p-2 celestial-orbit-spin duration-[60s] pointer-events-none opacity-80 filament-glow mix-blend-screen"
        src={HOTLINKED_ASSETS.armillarySphere}
        referrerPolicy="no-referrer"
      />

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#121318]/70 pointer-events-none" />

      {/* Central Filament Tap Target */}
      <button
        type="button"
        className="absolute z-20 w-16 h-16 rounded-full border border-primary/60 bg-primary/15 backdrop-blur-md flex flex-col items-center justify-center text-center active:scale-90 transition-transform cursor-pointer shadow-[0_0_20px_rgba(244,190,101,0.4)]"
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[0])}
      >
        <span className="material-symbols-outlined text-primary text-[22px] animate-pulse">
          lightbulb
        </span>
        <span className="text-[9px] font-label-spatial text-primary font-bold tracking-tight">
          CORE
        </span>
      </button>

      {/* 6 Orbiting Accessible Node Triggers (Clickable HUD Badges) */}
      {/* 1. Existing Solutions (Lavender) */}
      <button
        type="button"
        className={`absolute top-6 left-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'solutions' ? 'border-[#D5D1E4] ring-2 ring-[#D5D1E4]/50' : 'border-[#D5D1E4]/50'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[1])}
      >
        <span className="w-2 h-2 rounded-full bg-[#D5D1E4]" />
        <span className="font-label-spatial text-[10px] text-[#D5D1E4] font-medium">Solutions</span>
      </button>

      {/* 2. Evidence (Sage) */}
      <button
        type="button"
        className={`absolute top-6 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'evidence' ? 'border-[#B8C4A5] ring-2 ring-[#B8C4A5]/50' : 'border-[#B8C4A5]/50'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[2])}
      >
        <span className="w-2 h-2 rounded-full bg-[#B8C4A5]" />
        <span className="font-label-spatial text-[10px] text-[#B8C4A5] font-medium">Evidence</span>
      </button>

      {/* 3. Dependencies (Dusty Blue) */}
      <button
        type="button"
        className={`absolute bottom-16 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'dependencies' ? 'border-[#B8C9D7] ring-2 ring-[#B8C9D7]/50' : 'border-[#B8C9D7]/50'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[3])}
      >
        <span className="w-2 h-2 rounded-full bg-[#B8C9D7]" />
        <span className="font-label-spatial text-[10px] text-[#B8C9D7] font-medium">Dependencies</span>
      </button>

      {/* 4. Build Plan (Lavender Checklist) */}
      <button
        type="button"
        className={`absolute bottom-16 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'build-plan' ? 'border-[#D5D1E4] ring-2 ring-[#D5D1E4]/50' : 'border-[#D5D1E4]/50'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[4])}
      >
        <span className="w-2 h-2 rounded-full bg-[#D5D1E4]" />
        <span className="font-label-spatial text-[10px] text-[#D5D1E4] font-medium">Build Plan</span>
      </button>

      {/* 5. Competition (Antique Gold) */}
      <button
        type="button"
        className={`absolute top-1/2 -translate-y-12 right-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'competition' ? 'border-[#D6A34D] ring-2 ring-[#D6A34D]/50' : 'border-[#D6A34D]/60'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[5])}
      >
        <span className="w-2 h-2 rounded-full bg-[#d6a34d]" />
        <span className="font-label-spatial text-[10px] text-[#f4be65] font-medium">Competition</span>
      </button>

      {/* 6. Risks (Terracotta) */}
      <button
        type="button"
        className={`absolute top-1/2 -translate-y-12 left-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1f28]/90 border ${
          activeNodeId === 'risks' ? 'border-[#D99B78] ring-2 ring-[#D99B78]/50' : 'border-[#D99B78]/60'
        } shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-transform cursor-pointer`}
        onClick={() => onSelectNode(SPATIAL_CORE_NODES[6])}
      >
        <span className="w-2 h-2 rounded-full bg-[#D99B78]" />
        <span className="font-label-spatial text-[10px] text-[#D99B78] font-medium">Risks (3)</span>
      </button>
    </div>
  );
};
