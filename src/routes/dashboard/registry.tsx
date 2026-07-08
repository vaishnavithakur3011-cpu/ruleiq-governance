import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockRules } from "@/lib/mock-data";
import type { Rule } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/registry")({
  component: RuleRegistry,
});

const STATUS_COLORS: Record<string, string> = {
  approved: "#10B981",
  review: "#F59E0B",
  zombie: "#EF4444",
};

function HealthRing({ score, status }: { score: number; status: string }) {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
      />
      <circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        stroke={STATUS_COLORS[status]}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 16 16)"
      />
      <text x="16" y="18" textAnchor="middle" fill="white" style={{ fontSize: 9 }}>
        {score}
      </text>
    </svg>
  );
}

function RuleDrawer({
  rule,
  onClose,
}: {
  rule: Rule | null;
  onClose: () => void;
}) {
  if (!rule) return null;

  return (
    <motion.div
      initial={{ x: 480, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 480, opacity: 0 }}
      className="fixed right-0 top-16 h-[calc(100vh-64px)] overflow-y-auto"
      style={{
        width: 480,
        background: "rgba(8,11,20,0.95)",
        backdropFilter: "blur(16px)",
        borderLeft: "1px solid rgba(255,255,255,0.1)",
        zIndex: 100,
      }}
    >
      <div className="p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="font-display font-bold text-white text-2xl">{rule.name}</h2>
        <p className="text-[#A0A0A0] mt-2" style={{ fontSize: 14 }}>
          {rule.description}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs"
            style={{
              background: `${STATUS_COLORS[rule.status]}20`,
              border: `1px solid ${STATUS_COLORS[rule.status]}`,
              color: STATUS_COLORS[rule.status],
            }}
          >
            {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
          </span>
          <HealthRing score={rule.healthScore} status={rule.status} />
        </div>

        <div className="mt-8">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Owner</Label>
          <p className="text-white mt-1">{rule.owner}</p>
        </div>

        <div className="mt-6">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Team</Label>
          <p className="text-white mt-1">{rule.team}</p>
        </div>

        <div className="mt-6">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Last Modified</Label>
          <p className="text-white mt-1">{rule.lastModified}</p>
        </div>

        <div className="mt-6">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">IF/THEN Logic</Label>
          <div
            className="mt-2 rounded-md p-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <pre className="font-mono-code text-[#A0A0A0] whitespace-pre-wrap" style={{ fontSize: 12 }}>
              {rule.ifThenLogic}
            </pre>
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Dependencies</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {rule.dependencies.map((dep) => (
              <span
                key={dep}
                className="px-2 py-1 rounded text-xs"
                style={{ background: "rgba(255,255,255,0.05)", color: "#A0A0A0" }}
              >
                {dep}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Version History</Label>
          <div className="mt-2 space-y-2">
            {rule.versionHistory.map((v, i) => (
              <div
                key={i}
                className="p-3 rounded"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white" style={{ fontSize: 13 }}>v{v.version}</span>
                  <span className="text-[#A0A0A0]" style={{ fontSize: 11 }}>{v.date}</span>
                </div>
                <p className="text-[#A0A0A0] mt-1" style={{ fontSize: 12 }}>
                  {v.author}: {v.changes}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Label className="text-[#A0A0A0] text-xs uppercase tracking-wider">Audit Trail</Label>
          <div className="mt-2 space-y-2">
            {rule.auditTrail.map((a) => (
              <div
                key={a.id}
                className="p-3 rounded"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white" style={{ fontSize: 13 }}>{a.action}</span>
                  <span className="text-[#A0A0A0]" style={{ fontSize: 11 }}>
                    {a.timestamp.slice(0, 10)}
                  </span>
                </div>
                <p className="text-[#A0A0A0] mt-1" style={{ fontSize: 12 }}>
                  {a.user}: {a.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 bg-white text-black hover:bg-white/90">
            Edit Rule
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function RuleRegistry() {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [filterOwner, setFilterOwner] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRules = mockRules.filter((rule) => {
    if (filterOwner !== "all" && rule.team !== filterOwner) return false;
    if (filterStatus !== "all" && rule.status !== filterStatus) return false;
    if (searchQuery && !rule.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-white" style={{ fontSize: 28 }}>
          Rule Registry
        </h1>
        <Button className="bg-white text-black hover:bg-white/90">Add Rule</Button>
      </div>

      {/* Filters */}
      <div
        className="mb-6 rounded-lg p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div className="flex-1 min-w-[200px]">
          <Label className="text-[#A0A0A0] text-xs mb-1 block">Search</Label>
          <Input
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-white/10 text-white"
          />
        </div>
        <div style={{ minWidth: 180 }}>
          <Label className="text-[#A0A0A0] text-xs mb-1 block">Owner</Label>
          <Select value={filterOwner} onValueChange={setFilterOwner}>
            <SelectTrigger className="bg-transparent border-white/10 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D1117] border-white/10">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Credit">Credit</SelectItem>
              <SelectItem value="Risk">Risk</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div style={{ minWidth: 180 }}>
          <Label className="text-[#A0A0A0] text-xs mb-1 block">Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-transparent border-white/10 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D1117] border-white/10">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="zombie">Zombie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <table className="w-full text-left">
          <thead style={{ background: "rgba(255,255,255,0.02)" }}>
            <tr>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Rule Name</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Owner</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Team</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Status</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Health</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Last Modified</th>
              <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Dependencies</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule, index) => (
              <tr
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className="cursor-pointer transition-colors"
                style={{
                  background: index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <td className="p-4 text-white font-semibold" style={{ fontSize: 14 }}>
                  {rule.name}
                </td>
                <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                  {rule.owner}
                </td>
                <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                  {rule.team}
                </td>
                <td className="p-4">
                  <span
                    className="px-2 py-1 rounded-full text-xs"
                    style={{
                      background: `${STATUS_COLORS[rule.status]}20`,
                      border: `1px solid ${STATUS_COLORS[rule.status]}`,
                      color: STATUS_COLORS[rule.status],
                    }}
                  >
                    {rule.status}
                  </span>
                </td>
                <td className="p-4">
                  <HealthRing score={rule.healthScore} status={rule.status} />
                </td>
                <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                  {rule.lastModified}
                </td>
                <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                  {rule.dependencies.length} rules
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {selectedRule && (
        <RuleDrawer rule={selectedRule} onClose={() => setSelectedRule(null)} />
      )}
    </div>
  );
}
