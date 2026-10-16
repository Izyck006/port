export interface SourceCodeItem {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  language: string;
  price: number;
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
    initialDownloads: 14,
    tags: ['Python', 'OpenCV', 'React', 'FastAPI'],
    features: ['Real-time object detection', 'Edge hardware optimizations', 'WebSocket live feed dashboard', 'Webhook alerts'],
    demoUrl: 'https://agro-sec.vercel.app',
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
    initialDownloads: 9,
    tags: ['Python', 'PySide6', 'MongoDB', 'Biometrics'],
    features: ['USB scanner drivers', 'Automated clock-in/out logic', 'Admin reporting & export', 'Offline-first database sync'],
  },
  {
    id: 'zizzag-app',
    title: 'ZigZag App — Procedural Animation & Motion Choreography Engine',
    description: 'Autonomous motion engine and dance choreography synthesis system featuring mathematical kinematics, dynamic stickman physics, audio-synced routines, and interactive catalog.',
    fileName: 'ZigZag-App-Engine.zip',
    fileSize: '48.5 MB',
    language: 'Python',
    price: 15000,
    currency: '₦',
    initialDownloads: 12,
    tags: ['Python', 'Kinematics', 'Procedural Animation', 'Audio Engine'],
    features: ['5000+ procedural motion routines', 'Real-time choreography pipeline', 'Dynamic audio rhythm analysis', 'Interactive stickman visualizer'],
  }
];
