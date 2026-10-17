import {
  FolioItem,
  RiskItem,
  RoadmapTask,
  RubricCriterion,
  DependencyNode,
  SpatialNode
} from '../types';

export const SPATIAL_CORE_NODES: SpatialNode[] = [
  {
    id: 'core',
    name: 'Seedling Core Alpha',
    category: 'Central Core',
    accentColor: '#f4be65',
    description: 'Primary autonomous seed dispersal logic combining LiDAR micro-topography with hyper-local moisture indices.',
    metric: '91.4% Harmonic'
  },
  {
    id: 'solutions',
    name: 'Existing Solutions',
    category: 'Competitor Analysis',
    accentColor: '#D5D1E4',
    description: 'Evaluated 14 competitor patents and open-source autonomous forestry frameworks. Overlap index: 38%.',
    metric: '14 Patents'
  },
  {
    id: 'evidence',
    name: 'Evidence & Validation',
    category: 'Research Base',
    accentColor: '#B8C4A5',
    description: 'ArXiv:2403.0112 validation, 3 GitHub reference implementations, canopy density dataset confirmation.',
    metric: '96% Conf'
  },
  {
    id: 'dependencies',
    name: 'Dependencies & Feasibility',
    category: 'Technical Graph',
    accentColor: '#B8C9D7',
    description: 'OpenStreetMap Hydro v3, DJI SDK ROS2 wrapper, PyTorch Mobile RT edge inference library.',
    metric: '12 Pinned'
  },
  {
    id: 'build-plan',
    name: 'Build Plan & Milestones',
    category: 'Roadmap',
    accentColor: '#D5D1E4',
    description: 'Sprint 1: Sensor fusion simulation. Sprint 2: Pneumatic payload trigger test. Sprint 3: Drone-edge deployment.',
    metric: '68% Complete'
  },
  {
    id: 'competition',
    name: 'Competition & Hackathon Track',
    category: 'Judging Rubric',
    accentColor: '#D6A34D',
    description: 'Aligned with Climate AI Grand Challenge. Technical criteria alignment score: 94%.',
    metric: '28/30 Pts'
  },
  {
    id: 'risks',
    name: 'Blockers & Fallbacks',
    category: 'Risk Register',
    accentColor: '#D99B78',
    description: 'GPS denied dense forest navigation: fallback to optical flow SLAM. High payload battery consumption.',
    metric: '3 Mitigated'
  }
];

export const FOLIOS_DATA: FolioItem[] = [
  {
    id: 'folio-884',
    folioNumber: 'FOLIO #884-DS',
    title: 'Autonomous Drone Seedling v2.4',
    subtitle: 'Botanical Robotics · Jetson SLAM',
    status: 'ACTIVE',
    feasibility: 91,
    trl: 'TRL-6 Field Tested',
    payload: 'Payload: Quad-LIDAR 1.4kg',
    updated: 'Updated 2h ago',
    simRuns: '16 Simulation Runs',
    isCurrent: true
  },
  {
    id: 'folio-912',
    folioNumber: 'FOLIO #912-MS',
    title: 'Myco-Substrate Bio-Sensors',
    subtitle: 'Mycology · Bio-Acoustic Telemetry',
    status: 'EXPERIMENTAL',
    feasibility: 78,
    trl: 'TRL-3 Lab Synth',
    payload: 'Electrode Array: Hyphae Grid',
    updated: '4 Nodes Active'
  },
  {
    id: 'folio-741',
    folioNumber: 'FOLIO #741-CN',
    title: 'Autonomous Coral Nursery Tether',
    subtitle: 'Marine Robotics · Acoustic SLAM',
    status: 'ACTIVE',
    feasibility: 88,
    trl: 'TRL-5 Sub-surface',
    payload: 'Hydro-Telemetry Sync 100%',
    updated: 'Updated Yesterday'
  },
  {
    id: 'folio-950',
    folioNumber: 'FOLIO #950-SA',
    title: 'Stratospheric Airship Albedo Array',
    subtitle: 'Atmospheric Physics · Solar UAV',
    status: 'EXPERIMENTAL',
    feasibility: 64,
    trl: 'TRL-2 Simulation',
    payload: 'Solar Flux: 1361 W/m²',
    updated: '8 Citations'
  },
  {
    id: 'folio-620',
    folioNumber: 'FOLIO #620-WT',
    title: 'Urban Micro-Wind Turbine Pod v1.1',
    subtitle: 'CleanTech · Aero Acoustics',
    status: 'ARCHIVED',
    feasibility: 82,
    trl: 'TRL-7 Deployed',
    payload: 'Status: Deep Cold Storage',
    updated: 'Concluded Oct 2023'
  },
  {
    id: 'folio-580',
    folioNumber: 'FOLIO #580-BC',
    title: 'Sub-Canopy Seed Broadcast Cannon',
    subtitle: 'Pneumatics · Predecessor to v2.4',
    status: 'ARCHIVED',
    feasibility: 70,
    trl: 'Superseded by v2.4',
    payload: 'Mechanical chassis migrated to Jetson platform',
    updated: '14 Retained Logs'
  }
];

export const RISKS_DATA: RiskItem[] = [
  {
    id: 'risk-1',
    code: 'RISK #01',
    priority: 'P1 HIGH',
    priorityColor: '#D99B78',
    category: 'HARDWARE / RF SENSING',
    status: 'MITIGATED',
    title: 'Canopy Density Induced GNSS Multipath Blindout',
    hazard: 'Foliage density >65% creates up to 14m horizontal positional drift, disabling standard RTK GPS guidance loops during under-canopy maneuvers.',
    rootCause: 'Severe RF signal scattering and attenuation off wet western red cedar branches. Direct collision hazard and erratic hover altitude divergence.',
    evidence: 'Field Log #04 (Olympic Peninsula Test Flight), arXiv:2403.0112',
    mitigationTitle: 'ACTIVE MITIGATION VERIFIED',
    mitigationDesc: 'On-device Botanical Optical Flow SLAM utilizing Jetson Orin Nano TensorRT pipeline with downward stereo disparity hold and IMU dead-reckoning fusion.',
    mitigationResult: '→ Confirmed sub-5cm positional hold in 85% canopy shadow test.',
    fallbackTitle: 'FALLBACK PROTOCOL ARMED (LEVEL-2)',
    fallbackDesc: 'Autonomous optical altitude tether lock paired with 1.2m acoustic sonar floor proximity hold. Immediate abort into 5-meter hover until RTK signal reacquisition.',
    fallbackParam: 'TIMEOUT: 350ms'
  },
  {
    id: 'risk-2',
    code: 'RISK #02',
    priority: 'P0 CRITICAL PATH',
    priorityColor: '#ffb4ab',
    category: 'BALLISTICS & SOIL BIO',
    status: 'VERIFIED',
    title: 'Seed Capsule Kinetic Bounce on Heavy Humus Carpet',
    hazard: 'Dry pine needle thatch and wet moss mats cause traditional gravity drop-pods to deflect up to 64% without penetrating into damp mineral soil.',
    rootCause: 'Immediate radicle desiccation and 0% seedling germination due to lack of mineral substrate contact.',
    evidence: 'TerraDrone Agri-X loss telemetry (65% unanchored failure rate observed)',
    mitigationTitle: 'PNEUMATIC PENETRATION REVISION',
    mitigationDesc: 'High-pressure 3.2 MPa pneumatic needle dart ejection penetrates 45mm organic humus layer into damp mineral loam, seating mycorrhizal core directly at root depth.',
    mitigationResult: '→ Validated at Pacific Rainforest Research Station #71-B (94.2% penetration success).',
    fallbackTitle: 'FALLBACK PROTOCOL B: MICRO-AUGER DEPLOYMENT',
    fallbackDesc: 'Secondary weighted tungsten micro-auger anchoring coil attachment deployed dynamically if infrared camera detects dry thatch bounce >10cm.',
    fallbackParam: 'TRL-5'
  },
  {
    id: 'risk-3',
    code: 'RISK #03',
    priority: 'P1 HIGH',
    priorityColor: '#f4be65',
    category: 'AVIONICS & COMPUTE',
    status: 'IN TESTING (80%)',
    title: 'High Ambient Canopy Heat Thermal Throttling on Jetson Orin',
    hazard: 'Summer canopy greenhouse effect (>38°C) paired with continuous FP16 TensorRT inference risks GPU core thermal throttling below 30 FPS.',
    rootCause: 'Component: Sensor & Compute Node #104 (Under-fuselage bay).',
    evidence: 'Lab Flight Benchmark #14 (Thermal chamber run)',
    mitigationTitle: 'ENGINEERING MITIGATION',
    mitigationDesc: 'Custom CNC-milled pyrolytic graphite thermal shim + forced duct cooling routed directly through propeller downwash stream.',
    fallbackTitle: 'DYNAMIC QUANTIZATION FALLBACK',
    fallbackDesc: 'Automatic downscale to YOLOv8-Nano INT8 precision mode upon thermal threshold >82°C. Sustains 55 FPS with 42% thermal margin.',
    fallbackParam: '5.1W DRAW'
  },
  {
    id: 'risk-4',
    code: 'RISK #04',
    priority: 'P2 MODERATE',
    priorityColor: '#bfcbac',
    category: 'ACOUSTIC ECOLOGY',
    status: 'MONITORING',
    title: 'Acoustic Bird Disturbance in Protected Avian Habitats',
    hazard: 'High-frequency rotor whine in Marbled Murrelet nesting zones triggers regulatory sound threshold breaches (>65 dBA at 10m).',
    evidence: 'Forestry Sound Attenuation Standard ISO-1996',
    mitigationTitle: 'TOROIDAL ROTOR DESIGN',
    mitigationDesc: 'Closed-loop toroidal propeller geometries damp acoustic tip vortices, lowering SPL by 8.4 dBA across 4kHz spectrum.',
    fallbackTitle: 'MISSION SCHEDULER FALLBACK',
    fallbackDesc: 'Automated dawn/dusk quiet window lock enforced through localized GPS boundary polygon validator.',
    fallbackParam: 'GPS Geofence'
  }
];

export const ROADMAP_TASKS: RoadmapTask[] = [
  {
    id: 'task-104',
    code: 'TASK #104',
    category: 'ODOMETRY CORE',
    title: 'ROS2 Iron Botanical SLAM Pipeline Integration',
    status: 'VERIFIED',
    completed: true,
    description: 'Full on-board optical-inertial fusion with real-time foliage density filtering and landmark drift compensation.',
    duration: '3d (Actual: 2.5d)',
    environment: 'Jetson Orin Nano BSP v5.1.2',
    metric: '42 FPS RT verified on-device via TensorRT FP16'
  },
  {
    id: 'task-105',
    code: 'TASK #105',
    category: 'BALLISTICS & SOIL BIO',
    title: '3.2 MPa Pneumatic Dart Ejection Calibration',
    status: 'ACTIVE',
    progress: 85,
    completed: false,
    isCritical: true,
    description: 'High-pressure pneumatic needle dart calibration to penetrate organic humus layer into damp mineral loam.',
    acceptanceCriteria: 'Substrate penetration depth >45mm through wet moss & heavy humus carpet.',
    linkedRisk: 'Seed Capsule Kinetic Bounce (Mitigated via dampening skirt)',
    fallback: 'Secondary dual-burrow micro-auger anchoring coil attachment'
  },
  {
    id: 'task-106',
    code: 'TASK #106',
    category: 'AVIONICS & COMPUTE',
    title: 'Multi-Path GNSS Blindout Optical Flow Fallback',
    status: '40%',
    progress: 40,
    completed: false,
    description: 'Automatic hover lock triggered when canopy satellite SNR drops below 18 dBHz. Evaluates ground texture disparity vectors.',
    requires: 'Dep: Dual-RGBD Sensor Array (#102)'
  },
  {
    id: 'task-107',
    code: 'TASK #107',
    category: 'ECOLOGICAL SAFETY',
    title: 'Autonomous Canopy Drop-Zone Geofence Validation',
    status: 'QUEUED',
    completed: false,
    description: 'Dawn/dusk quiet zone boundary enforcement and protected avian nesting corridor avoidance.',
    requires: '#105, #106',
    scheduled: 'June 18, 2024'
  }
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'crit-1',
    code: 'CRITERION 01',
    category: 'NAVIGATION',
    title: 'Edge Autonomy & GPS-Denied Navigation',
    score: 10,
    maxScore: 10,
    status: 'VERIFIED',
    rubricQuote: '“Autonomous positioning hold without satellite GNSS under dense tree canopy (>60% obstruction).”',
    evidenceTitle: 'Empirical Hardware Telemetry Evidence',
    evidenceTag: 'TENSOR-RT ACCELERATED',
    evidenceDesc: 'Botanical Optical Flow SLAM sub-5cm spatial hold (Jetson Orin Nano TensorRT pipeline). Field Log #04.',
    linkedTask: 'Task #104 (Verified)'
  },
  {
    id: 'crit-2',
    code: 'CRITERION 02',
    category: 'REFORESTATION',
    title: 'Ecological Impact & Reforestation Throughput',
    score: 9,
    maxScore: 10,
    status: 'VERIFIED',
    rubricQuote: '“Defensible seed survival rate in moss-covered mineral soil with zero seedling root disturbance.”',
    evidenceTitle: 'Empirical Hardware Telemetry Evidence',
    evidenceTag: '94.2% MYCORRHIZAL',
    evidenceDesc: '3.2 MPa pneumatic dart achieving 45mm soil penetration with 94.2% mycorrhizal contact.',
    linkedTask: 'Task #105 (85% Active)'
  },
  {
    id: 'crit-3',
    code: 'CRITERION 03',
    category: 'DEFENSIBILITY',
    title: 'Proprietary IP & Defensive Moat',
    score: 5,
    maxScore: 5,
    status: 'VERIFIED',
    rubricQuote: '“Novel architectural differentiation with zero reliance on cloud-tethered proprietary stacks.”',
    evidenceTitle: 'Empirical Hardware Telemetry Evidence',
    evidenceTag: 'APACHE 2.0 / ROS2',
    evidenceDesc: '0 direct competitor clones; open Apache 2.0 ROS2 pipeline with on-board edge inference.',
    linkedTask: 'Competitor Overlap Matrix (92% Score)'
  },
  {
    id: 'crit-4',
    code: 'CRITERION 04',
    category: 'ECOLOGICAL SAFETY',
    title: 'Safety Redundancy & Avian Compliance',
    score: 4,
    maxScore: 5,
    status: 'IN PROGRESS',
    rubricQuote: '“Auditory footprint below 65 dBA at 10m to prevent wildlife disturbance in protected canopy reserves.”',
    evidenceTitle: 'Empirical Hardware Telemetry Evidence',
    evidenceTag: '-8.4 dBA SPIKE ATTENUATION',
    evidenceDesc: 'Toroidal propeller geometry lowers acoustic spike by 8.4 dBA. Acoustic validation test scheduled.',
    linkedTask: 'Task #107 (Queued)'
  }
];

export const DEPENDENCY_NODES: DependencyNode[] = [
  {
    id: 'dep-1',
    code: 'EDGE COMPUTE / TENSORRT',
    category: 'Edge Compute',
    title: 'Jetson Orin Nano (8GB Unified LPDDR5)',
    status: 'VERIFIED',
    statusNote: 'PASS (42 FPS)',
    specMetricKey: 'RUN-TIME VERIFICATION:',
    specMetricVal: 'PASS (42 FPS)',
    description: '42 FPS RT verified on-device via TensorRT FP16, 23ms latency, 5.1W draw',
    docCitation: 'NVIDIA Orin BSP v5.1.2 Benchmark Log #14'
  },
  {
    id: 'dep-2',
    code: 'AVIONICS & COMMS',
    category: 'Avionics',
    title: 'MAVLink V2 Sub-Bus Telemetry Bridge',
    status: 'VERIFIED',
    statusNote: '100% SYNC',
    specMetricKey: 'BUS INTEGRITY:',
    specMetricVal: '100% SYNC',
    description: '100% telemetry packet sync, sub-8ms roundtrip UART ring-buffer',
    docCitation: 'PX4 Autopilot V2.4 Serial Bus Spec'
  },
  {
    id: 'dep-3',
    code: 'SENSING / SLAM',
    category: 'Sensing',
    title: 'Dual-RGBD Botanical Depth Camera Array',
    status: 'EVIDENCE FOUND',
    statusNote: '<5CM DENSITY',
    specMetricKey: 'DEPTH POINT DENSITY:',
    specMetricVal: '<5CM DENSITY',
    description: 'Sub-5cm point-cloud resolution in wet foliage under ambient 1200 lux',
    docCitation: 'Intel RealSense D435i Lab Telemetry Sheet'
  },
  {
    id: 'dep-4',
    code: 'BALLISTICS / EJECTION',
    category: 'Ballistics',
    title: '3.2 MPa Pneumatic Dart Actuation Solenoid',
    status: 'BLOCKED (HARD GATE)',
    statusNote: 'REQ: 4.0 MPa',
    specMetricKey: 'REASON FOR BLOCK:',
    specMetricVal: 'FAIL (-20.0%)',
    description: 'Pending 4.0 MPa burst safety certification at Pacific Testing Station. Actuator failed under cryogenic low-pressure chamber run #8820-X.',
    docCitation: 'Gating Spec #DARPA-STTR-782',
    isBlocked: true,
    blockReason: 'Pending 4.0 MPa burst safety certification at Pacific Testing Station',
    fallbackNote: 'Secondary dual-burrow micro-auger anchoring coil active'
  },
  {
    id: 'dep-5',
    code: 'POWER & BMS',
    category: 'Energy',
    title: '4S LiFePO4 14.8V 5200mAh',
    status: 'VERIFIED',
    statusNote: 'COLD SAFE -15°C',
    specMetricKey: 'BUS VOLTAGE:',
    specMetricVal: '14.8V NOMINAL',
    description: 'Continuous 60A Max draw, smart BMS telemetry nominal in low temperature tests',
    docCitation: 'Tattu 4S UAV Cold-Weather Discharge Test #88-C'
  },
  {
    id: 'dep-6',
    code: 'CONTINGENCY / READY',
    category: 'Fallback',
    title: 'Protocol B-2 Dual-Burrow Micro-Auger',
    status: 'CONTINGENCY / READY',
    statusNote: '-320g DELTA',
    specMetricKey: 'FALLBACK ROTARY:',
    specMetricVal: '185 RPM',
    description: 'Rotary soil screw alternative (185 RPM) bypassing pneumatic pressure thresholds entirely.',
    docCitation: 'AutoSys Bench Protocol B-2 Spec #4491'
  }
];

export const HOTLINKED_ASSETS = {
  armillarySphere: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwXnLyO3aUrdGVC4yokmNoLAQXHAin6Pn5xXuUEY-lF2Re31SC_rlpFddPnaRnZ2CsCPGJ2ysWv9O2P2MF9Y37UzzyyCipL049GsUtly3FdSURm87acRBItul76mCccy5O-kM18GzFpq9VTMosidbLvCgD36ItxbqeAErs8PViUInqYjiNJLAR5_XGeOlBbY89obM6VzB-DlABJ2NvaK5cFzrj1l3nPiiWPyYQV5_gks2zuFe41qeqFg',
  botanicalJournal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ix_amlcSi48OkfHEeqZT2vaOyXqp6eWHUR3rdqohVTshBeeiiECIOzzh8VfoLA4OhYJLcvWKozfS772iDmNhCOReBcwNLK5_9nsm7zCxgrWx1s5L4lOKhKstz8VEnwfBhQNdRWTYMdthvAVhNm-ZInUCFd6Udgm9nPaxFzgfy1MtMHET75tGmLmN6rawwXy-w7V3fZu8-oocGoUPojVAVbS_ErM7t_A4-iTU4p63ehBFGMI0M6drpA',
  droneSpecimen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClQPCp64imWiFODZQzE-YsJx1RLlGVnydB9_1UeOfUgsQ7-xND7dXJSbtdsDozEWUr5GIP3ByMaENGE5wWGyydhKzDnWQu1CJURBsevwj6gehRPaqfxIuY9dOZMUuAzmD0FHc--cT3pBAeyQpgjR83PwB_VOTgu80mcF_FfYN0RFyNnq_dOYBtb-yLEK8mnCeEcGDgqaXYd2VBVq_-bBF4Qj7tZn2psozcq-kcEEpxVYvTGgVfc6byCA'
};
