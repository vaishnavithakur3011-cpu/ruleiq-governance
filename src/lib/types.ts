export type RuleStatus = "approved" | "review" | "zombie";

export interface Rule {
  id: string;
  name: string;
  owner: string;
  team: string;
  status: RuleStatus;
  healthScore: number;
  lastModified: string;
  dependencies: string[];
  ifThenLogic: string;
  description: string;
  versionHistory: VersionEntry[];
  auditTrail: AuditEntry[];
}

export interface VersionEntry {
  version: number;
  date: string;
  author: string;
  changes: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export interface DriftAlert {
  id: string;
  ruleId: string;
  ruleName: string;
  status: "amber" | "crimson";
  percentage: number;
  timestamp: string;
  message: string;
  actionRequired: boolean;
}

export interface SimulationResult {
  complianceCoverage: number;
  revenueImpact: number;
  ruleConflicts: number;
  deploymentRisk: "Low" | "Medium" | "High";
}

export interface HistoricalDecision {
  id: string;
  date: string;
  outcome: "Approved" | "Rejected" | "Review";
  ruleVersion: string;
  riskScore: number;
  inputData: Record<string, unknown>;
  executionPath: string[];
  owner: string;
  regulatoryBasis: string;
}

export interface GraphNode {
  id: string;
  name: string;
  owner: string;
  status: RuleStatus;
  health: number;
  group: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
