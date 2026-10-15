export interface SourceCodeItem {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  language: string;
  price: number; // in NGN
  currency: string;
  initialDownloads: number;
  tags: string[];
  features?: string[];
  demoUrl?: string;
  downloadUrl?: string;
}

export const INITIAL_SOURCE_CODE_ITEMS: SourceCodeItem[] = [
  {
    id: 'agrosec-ai',
    title: 'AgroSec — Edge AI Intrusion Detection & Vision System',
    description: 'Complete edge-computing computer vision pipeline for perimeter monitoring, animal detection, and real-time alerts with React telemetry dashboard.',
    fileName: 'AgroSec-Vision-Pipeline.zip',
    fileSize: '65.8 MB',
    language: 'Python',
    price: 15000,
    currency: '₦',
    initialDownloads: 12,
    tags: ['Python', 'OpenCV', 'React', 'FastAPI'],
    features: ['Real-time object detection', 'Edge hardware optimizations', 'WebSocket live feed dashboard', 'Webhook alerts'],
  },
  {
    id: 'workplace-biometrics',
    title: 'Biometric Workplace Attendance Engine & Desktop GUI',
    description: 'Production-ready biometric staff attendance tracking application built with PySide6 desktop GUI, MongoDB integration, and USB scanner matching.',
    fileName: 'Workplace-Attendance-System.zip',
    fileSize: '71.2 MB',
    language: 'Python',
    price: 15000,
    currency: '₦',
    initialDownloads: 8,
    tags: ['Python', 'PySide6', 'MongoDB', 'Biometrics'],
    features: ['USB scanner drivers', 'Automated clock-in/out logic', 'Admin reporting & export', 'Offline-first database sync'],
  },
  {
    id: 'zic-cad-generator',
    title: 'Parametric 3D CAD Enclosure Generator & Visualizer',
    description: 'Full-stack parametric enclosure generation tool built with CadQuery, Flask, and WebGL Three.js real-time 3D model viewer and export.',
    fileName: 'ZIC-Parametric-CAD.zip',
    fileSize: '12.4 MB',
    language: 'Python',
    price: 10000,
    currency: '₦',
    initialDownloads: 15,
    tags: ['Python', 'CadQuery', 'Flask', 'Three.js'],
    features: ['Custom dimensions slider', 'STEP/STL instant export', 'Interactive 3D orbit viewer', 'Rest API endpoint'],
  },
  {
    id: 'tesla-interactive',
    title: 'Tesla Interactive Showcase & Vehicle Visualizer',
    description: 'Cinematic Tesla vehicle customizer and interactive web experience featuring custom interior/exterior toggles, smooth camera sweeps, and reactive UI.',
    fileName: 'tesla-interactive-experience.zip',
    fileSize: '9.3 MB',
    language: 'JavaScript',
    price: 8000,
    currency: '₦',
    initialDownloads: 24,
    tags: ['React', 'JavaScript', 'Tailwind', 'Framer Motion'],
    features: ['Interactive color switcher', 'Responsive specs HUD', 'Glassmorphism dark aesthetics', 'Zero-latency transitions'],
  },
  {
    id: 'thronecraft-game',
    title: 'Thronecraft — Tactical Strategy Web Engine',
    description: 'Modular browser-based strategy game engine with custom grid pathfinding, procedural turn state managers, and sprite animation rendering.',
    fileName: 'thronecraft-engine.zip',
    fileSize: '18.6 MB',
    language: 'TypeScript',
    price: 12000,
    currency: '₦',
    initialDownloads: 9,
    tags: ['TypeScript', 'Canvas', 'Game Dev', 'Algorithms'],
    features: ['Grid-based pathfinding', 'Turn-based state machine', 'Audio SFX manager', 'Modular unit classes'],
  },
  {
    id: 'mysignout-fullstack',
    title: 'Digital Commemorative Yearbook & Signout Platform',
    description: 'Complete full-stack yearbook autograph portal featuring customer authentication, custom vanity URLs, real-time message feeds, and Paystack payments.',
    fileName: 'MySignout-Fullstack.zip',
    fileSize: '24.1 MB',
    language: 'TypeScript',
    price: 15000,
    currency: '₦',
    initialDownloads: 18,
    tags: ['TypeScript', 'React', 'Firebase', 'Paystack'],
    features: ['User profile generation', 'Interactive autograph board', 'Paystack subscription check', 'Real-time Firestore sync'],
  }
];
