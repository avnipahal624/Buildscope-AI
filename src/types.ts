export type AppScreen =
  | 'discover'
  | 'dashboard'
  | 'triage'
  | 'risks'
  | 'roadmap'
  | 'competitors'
  | 'dependencies'
  | 'dependency-intel'
  | 'traceability'
  | 'rubric'
  | 'folios'
  | 'auth'
  | 'register'
  | 'onboarding'
  | 'profile'
  | 'spatial-studio';

export type BottomTab = 'discover' | 'investigations' | '3d-core' | 'passport';

export interface SpatialNode {
  id: string;
  name: string;
  category: string;
  accentColor: string;
  description: string;
  metric?: string;
  x?: number;
  y?: number;
}

export interface FolioItem {
  id: string;
  folioNumber: string;
  title: string;
  subtitle: string;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'ARCHIVED';
  feasibility: number;
  trl: string;
  payload: string;
  updated: string;
  simRuns?: string;
  isCurrent?: boolean;
}

export interface RiskItem {
  id: string;
  code: string;
  priority: 'P0 CRITICAL PATH' | 'P1 HIGH' | 'P2 MODERATE';
  priorityColor: string;
  category: string;
  status: 'MITIGATED' | 'VERIFIED' | 'IN TESTING (80%)' | 'MONITORING';
  title: string;
  hazard: string;
  rootCause?: string;
  evidence: string;
  mitigationTitle: string;
  mitigationDesc: string;
  mitigationResult?: string;
  fallbackTitle: string;
  fallbackDesc: string;
  fallbackParam?: string;
}

export interface RoadmapTask {
  id: string;
  code: string;
  title: string;
  category: string;
  status: 'VERIFIED' | 'ACTIVE' | '40%' | 'QUEUED';
  progress?: number;
  description: string;
  completed: boolean;
  isCritical?: boolean;
  duration?: string;
  environment?: string;
  metric?: string;
  acceptanceCriteria?: string;
  linkedRisk?: string;
  fallback?: string;
  scheduled?: string;
  requires?: string;
}

export interface CompetitorData {
  name: string;
  status: string;
  statusType: 'success' | 'warning' | 'error';
  description: string;
  metric?: string;
}

export interface RubricCriterion {
  id: string;
  code: string;
  category: string;
  title: string;
  score: number;
  maxScore: number;
  status: 'VERIFIED' | 'IN PROGRESS';
  rubricQuote: string;
  evidenceTitle: string;
  evidenceTag: string;
  evidenceDesc: string;
  linkedTask: string;
}

export interface DependencyNode {
  id: string;
  code: string;
  category: string;
  title: string;
  status: 'VERIFIED' | 'EVIDENCE FOUND' | 'BLOCKED (HARD GATE)' | 'CONTINGENCY / READY';
  statusNote: string;
  specMetricKey: string;
  specMetricVal: string;
  description: string;
  docCitation: string;
  isBlocked?: boolean;
  blockReason?: string;
  fallbackNote?: string;
}
