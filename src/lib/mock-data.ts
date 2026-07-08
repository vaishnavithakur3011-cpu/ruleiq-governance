import type { Rule, GraphData } from "./types";

export const mockRules: Rule[] = [
  {
    id: "loan",
    name: "Loan Approval Rule",
    owner: "Credit Team",
    team: "Credit",
    status: "approved",
    healthScore: 94,
    lastModified: "2026-06-15",
    dependencies: ["fraud", "kyc", "credit"],
    ifThenLogic: `IF credit_score >= 750
   AND income >= 50000
   AND debt_to_income <= 0.4
THEN approve_loan(amount: requested_amount)
ELSE escalate_to_manual_review()`,
    description: "Primary loan approval logic for retail lending products including personal loans, auto loans, and home loans.",
    versionHistory: [
      { version: 1, date: "2025-01-10", author: "Priya Sharma", changes: "Initial rule creation" },
      { version: 2, date: "2025-04-22", author: "Rahul Verma", changes: "Added debt-to-income threshold per RBI circular" },
      { version: 3, date: "2026-06-15", author: "Amit Patel", changes: "Updated credit score threshold to 750" },
    ],
    auditTrail: [
      { id: "a1", action: "Rule Created", user: "Priya Sharma", timestamp: "2025-01-10T09:30:00", details: "Initial version deployed" },
      { id: "a2", action: "Modified", user: "Rahul Verma", timestamp: "2025-04-22T14:15:00", details: "Compliance update for RBI/2025-41" },
      { id: "a3", action: "Tested", user: "QA Team", timestamp: "2026-06-14T11:00:00", details: "Simulation passed with 98.2% coverage" },
    ],
  },
  {
    id: "fraud",
    name: "Fraud Detection Rule",
    owner: "Risk Team",
    team: "Risk",
    status: "approved",
    healthScore: 88,
    lastModified: "2026-05-28",
    dependencies: ["aml", "kyc"],
    ifThenLogic: `IF transaction_amount > 100000
   AND location != registered_address
   AND device_fingerprint_score < 0.7
THEN flag_for_review(priority: "high")
AND trigger_aml_check()`,
    description: "Real-time fraud detection for high-value transactions with multi-factor risk assessment.",
    versionHistory: [
      { version: 1, date: "2024-11-05", author: "Sneha Gupta", changes: "Initial rule creation" },
      { version: 2, date: "2025-02-18", author: "Vikram Singh", changes: "Enhanced device fingerprint scoring" },
      { version: 3, date: "2026-05-28", author: "Ananya Reddy", changes: "Updated thresholds per IRDAI guidelines" },
    ],
    auditTrail: [
      { id: "a4", action: "Rule Created", user: "Sneha Gupta", timestamp: "2024-11-05T10:00:00", details: "Initial version deployed" },
      { id: "a5", action: "Modified", user: "Vikram Singh", timestamp: "2025-02-18T16:45:00", details: "Device scoring enhancement" },
    ],
  },
  {
    id: "kyc",
    name: "KYC Verification Rule",
    owner: "Compliance Team",
    team: "Compliance",
    status: "review",
    healthScore: 61,
    lastModified: "2026-06-20",
    dependencies: ["aml"],
    ifThenLogic: `IF pan_verified == true
   AND aadhaar_linked == true
   AND face_match_score >= 0.85
THEN complete_kyc(level: "full")
ELSE IF pan_verified == true
   AND aadhaar_linked == false
THEN complete_kyc(level: "partial")
AND request_additional_docs()`,
    description: "KYC verification flow for customer onboarding with Aadhaar and PAN validation.",
    versionHistory: [
      { version: 1, date: "2025-03-12", author: "Kavita Joshi", changes: "Initial rule creation" },
      { version: 2, date: "2026-06-20", author: "Raj Malhotra", changes: "Updated face match threshold" },
    ],
    auditTrail: [
      { id: "a6", action: "Rule Created", user: "Kavita Joshi", timestamp: "2025-03-12T11:30:00", details: "Initial version" },
      { id: "a7", action: "Under Review", user: "Compliance Head", timestamp: "2026-06-21T09:00:00", details: "Pending RBI circular compliance check" },
    ],
  },
  {
    id: "aml",
    name: "AML Screening Rule",
    owner: "Compliance Team",
    team: "Compliance",
    status: "approved",
    healthScore: 91,
    lastModified: "2026-04-10",
    dependencies: [],
    ifThenLogic: `IF customer_name IN watchlist
   OR transaction_pattern == "structuring"
   OR country_risk == "high"
THEN escalate_to_compliance(team: "AML")
AND freeze_transaction()`,
    description: "Anti-Money Laundering screening against global watchlists and transaction pattern analysis.",
    versionHistory: [
      { version: 1, date: "2024-08-20", author: "Deepak Kumar", changes: "Initial rule creation" },
      { version: 2, date: "2025-01-15", author: "Neha Singh", changes: "Added FATF high-risk countries" },
      { version: 3, date: "2026-04-10", author: "Rohit Sharma", changes: "Updated watchlist sources" },
    ],
    auditTrail: [
      { id: "a8", action: "Rule Created", user: "Deepak Kumar", timestamp: "2024-08-20T10:00:00", details: "Initial deployment" },
      { id: "a9", action: "Modified", user: "Neha Singh", timestamp: "2025-01-15T14:30:00", details: "FATF update" },
    ],
  },
  {
    id: "interest",
    name: "Interest Rate Rule",
    owner: "Product Team",
    team: "Product",
    status: "review",
    healthScore: 45,
    lastModified: "2026-06-01",
    dependencies: ["loan"],
    ifThenLogic: `IF customer_segment == "premium"
   AND relationship_years >= 3
THEN interest_rate = base_rate - 0.5
ELSE IF customer_segment == "standard"
   AND credit_score >= 700
THEN interest_rate = base_rate
ELSE interest_rate = base_rate + 1.0`,
    description: "Dynamic interest rate calculation based on customer segment and risk profile.",
    versionHistory: [
      { version: 1, date: "2025-06-01", author: "Product Team", changes: "Initial rule creation" },
      { version: 2, date: "2026-03-15", author: "Arun Kumar", changes: "Updated premium segment criteria" },
      { version: 3, date: "2026-06-01", author: "Sunita Rao", changes: "Revised base rate spread" },
    ],
    auditTrail: [
      { id: "a10", action: "Rule Created", user: "Product Team", timestamp: "2025-06-01T09:00:00", details: "Initial version" },
      { id: "a11", action: "Under Review", user: "Risk Committee", timestamp: "2026-06-02T10:00:00", details: "Pending profitability analysis" },
    ],
  },
  {
    id: "legacy",
    name: "Legacy Underwriting Rule",
    owner: "Unknown",
    team: "Unknown",
    status: "zombie",
    healthScore: 12,
    lastModified: "2019-02-14",
    dependencies: ["loan", "interest"],
    ifThenLogic: `// LEGACY CODE - DO NOT MODIFY
if (applicant.income > 30000 && applicant.employment == "salaried") {
  approve(application);
} else {
  reject(application);
}
// Last modification: 2019-02-14
// Original author: Unknown (left organization)`,
    description: "Legacy underwriting logic from pre-digital transformation era. Owner unknown. Multiple downstream dependencies. High risk.",
    versionHistory: [
      { version: 1, date: "2017-05-20", author: "Unknown", changes: "Initial legacy rule" },
    ],
    auditTrail: [
      { id: "a12", action: "Rule Created", user: "Unknown", timestamp: "2017-05-20T00:00:00", details: "Legacy system migration" },
      { id: "a13", action: "Flagged as Zombie", user: "RuleIQ Scanner", timestamp: "2026-01-15T00:00:00", details: "No modification in 5+ years, owner unknown" },
    ],
  },
  {
    id: "credit",
    name: "Credit Limit Rule",
    owner: "Credit Team",
    team: "Credit",
    status: "approved",
    healthScore: 78,
    lastModified: "2026-05-05",
    dependencies: [],
    ifThenLogic: `IF credit_score >= 800
   AND income_verified == true
   AND existing_exposure <= 500000
THEN credit_limit = min(income * 0.5, 2000000)
ELSE IF credit_score >= 700
   AND income_verified == true
THEN credit_limit = min(income * 0.3, 1000000)
ELSE credit_limit = 100000`,
    description: "Credit limit determination for credit cards and revolving facilities.",
    versionHistory: [
      { version: 1, date: "2025-07-10", author: "Credit Team", changes: "Initial rule creation" },
      { version: 2, date: "2026-02-28", author: "Suresh Nair", changes: "Revised multipliers per risk committee" },
      { version: 3, date: "2026-05-05", author: "Lakshmi Iyer", changes: "Updated exposure limits" },
    ],
    auditTrail: [
      { id: "a14", action: "Rule Created", user: "Credit Team", timestamp: "2025-07-10T10:00:00", details: "Initial deployment" },
      { id: "a15", action: "Modified", user: "Suresh Nair", timestamp: "2026-02-28T15:30:00", details: "Risk committee update" },
    ],
  },
  {
    id: "onboard",
    name: "Customer Onboarding Rule",
    owner: "Product Team",
    team: "Product",
    status: "review",
    healthScore: 55,
    lastModified: "2026-06-10",
    dependencies: ["kyc", "fraud"],
    ifThenLogic: `IF kyc_status == "complete"
   AND fraud_score < 30
   AND document_count >= 3
THEN activate_account(type: requested_type)
AND send_welcome_kit()
ELSE IF kyc_status == "partial"
   AND fraud_score < 50
THEN create_temp_account()
AND request_pending_docs()`,
    description: "Customer onboarding workflow with KYC, fraud check, and document validation gates.",
    versionHistory: [
      { version: 1, date: "2025-09-01", author: "Product Team", changes: "Initial rule creation" },
      { version: 2, date: "2026-04-20", author: "Meera Patel", changes: "Added document count validation" },
      { version: 3, date: "2026-06-10", author: "Sanjay Gupta", changes: "Updated fraud score threshold" },
    ],
    auditTrail: [
      { id: "a16", action: "Rule Created", user: "Product Team", timestamp: "2025-09-01T09:00:00", details: "Initial version" },
      { id: "a17", action: "Under Review", user: "Operations Head", timestamp: "2026-06-11T10:00:00", details: "Drop-off analysis pending" },
    ],
  },
];

export const graphData: GraphData = {
  nodes: [
    { id: "loan", name: "Loan Approval Rule", owner: "Credit Team", status: "approved", health: 94, group: 1 },
    { id: "fraud", name: "Fraud Detection Rule", owner: "Risk Team", status: "approved", health: 88, group: 1 },
    { id: "kyc", name: "KYC Verification Rule", owner: "Compliance Team", status: "review", health: 61, group: 2 },
    { id: "aml", name: "AML Screening Rule", owner: "Compliance Team", status: "approved", health: 91, group: 1 },
    { id: "interest", name: "Interest Rate Rule", owner: "Product Team", status: "review", health: 45, group: 2 },
    { id: "legacy", name: "Legacy Underwriting Rule", owner: "Unknown", status: "zombie", health: 12, group: 3 },
    { id: "credit", name: "Credit Limit Rule", owner: "Credit Team", status: "approved", health: 78, group: 1 },
    { id: "onboard", name: "Customer Onboarding Rule", owner: "Product Team", status: "review", health: 55, group: 2 },
  ],
  links: [
    { source: "loan", target: "fraud" },
    { source: "loan", target: "kyc" },
    { source: "loan", target: "credit" },
    { source: "fraud", target: "aml" },
    { source: "fraud", target: "kyc" },
    { source: "kyc", target: "aml" },
    { source: "interest", target: "loan" },
    { source: "legacy", target: "loan" },
    { source: "legacy", target: "interest" },
    { source: "onboard", target: "kyc" },
    { source: "onboard", target: "fraud" },
  ],
};

export const driftAlerts = [
  {
    id: "d1",
    ruleId: "interest",
    ruleName: "Interest Rate Rule",
    status: "amber" as const,
    percentage: 12,
    timestamp: "2026-06-28T14:30:00",
    message: "Approval rate dropped 12%. No rule changes detected.",
    actionRequired: false,
  },
  {
    id: "d2",
    ruleId: "legacy",
    ruleName: "Legacy Underwriting Rule",
    status: "crimson" as const,
    percentage: 28,
    timestamp: "2026-06-27T09:15:00",
    message: "CRITICAL: Approval rate dropped 28%. Immediate investigation required.",
    actionRequired: true,
  },
  {
    id: "d3",
    ruleId: "kyc",
    ruleName: "KYC Verification Rule",
    status: "amber" as const,
    percentage: 15,
    timestamp: "2026-06-26T16:45:00",
    message: "KYC completion rate declined 15% week-over-week.",
    actionRequired: false,
  },
];

export const historicalDecisions = [
  {
    id: "DEC-2026-001",
    date: "2026-06-28",
    outcome: "Approved" as const,
    ruleVersion: "loan@v3",
    riskScore: 22,
    inputData: { credit_score: 780, income: 85000, loan_amount: 1500000 },
    executionPath: ["credit_check", "income_verification", "fraud_scan", "approval"],
    owner: "Credit Team",
    regulatoryBasis: "RBI/2025-41 - Retail Lending Guidelines",
  },
  {
    id: "DEC-2026-002",
    date: "2026-06-27",
    outcome: "Rejected" as const,
    ruleVersion: "loan@v3",
    riskScore: 78,
    inputData: { credit_score: 620, income: 45000, loan_amount: 2000000 },
    executionPath: ["credit_check", "income_verification", "rejection"],
    owner: "Credit Team",
    regulatoryBasis: "RBI/2025-41 - Credit Score Threshold",
  },
  {
    id: "DEC-2026-003",
    date: "2026-06-26",
    outcome: "Review" as const,
    ruleVersion: "fraud@v3",
    riskScore: 55,
    inputData: { transaction_amount: 500000, location: "Mumbai", device_score: 0.65 },
    executionPath: ["amount_check", "location_verify", "device_fingerprint", "escalation"],
    owner: "Risk Team",
    regulatoryBasis: "IRDAI/Circular/2025/08 - Fraud Prevention",
  },
  {
    id: "DEC-2026-004",
    date: "2026-06-25",
    outcome: "Approved" as const,
    ruleVersion: "kyc@v2",
    riskScore: 12,
    inputData: { pan_status: "verified", aadhaar_status: "linked", face_match: 0.92 },
    executionPath: ["pan_validation", "aadhaar_check", "face_verification", "approval"],
    owner: "Compliance Team",
    regulatoryBasis: "PMLA Guidelines 2025 - KYC Norms",
  },
];
