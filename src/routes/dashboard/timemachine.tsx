import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { historicalDecisions } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/timemachine")({
  component: TimeMachine,
});

const OUTCOME_COLORS: Record<string, string> = {
  Approved: "#10B981",
  Rejected: "#EF4444",
  Review: "#F59E0B",
};

function TimeMachine() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  const filteredDecisions = historicalDecisions.filter(
    (d) =>
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ruleVersion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = historicalDecisions.find((d) => d.id === selectedDecision);

  return (
    <div>
      <h1 className="font-display font-bold text-white mb-2" style={{ fontSize: 28 }}>
        Compliance Time Machine
      </h1>
      <p className="text-[#A0A0A0] mb-8" style={{ fontSize: 14 }}>
        Search any historical decision and reconstruct its execution path
      </p>

      {/* Search Bar */}
      <div
        className="mb-8 rounded-lg p-6"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Input
          placeholder="Search by Decision ID or Rule Version..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-white/10 text-white"
          style={{ fontSize: 16, padding: "12px 16px" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results List */}
        <div className="lg:col-span-1">
          <h3 className="text-white font-semibold mb-4">Results ({filteredDecisions.length})</h3>
          <div className="space-y-3">
            {filteredDecisions.map((decision) => (
              <div
                key={decision.id}
                onClick={() => setSelectedDecision(decision.id)}
                className="rounded-lg p-4 cursor-pointer transition-colors"
                style={{
                  background:
                    selectedDecision === decision.id
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.02)",
                  border:
                    selectedDecision === decision.id
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold" style={{ fontSize: 13 }}>
                    {decision.id}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: `${OUTCOME_COLORS[decision.outcome]}20`,
                      color: OUTCOME_COLORS[decision.outcome],
                    }}
                  >
                    {decision.outcome}
                  </span>
                </div>
                <p className="text-[#A0A0A0]" style={{ fontSize: 12 }}>
                  {decision.date} • {decision.ruleVersion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reconstruction Panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-xl">{selected.id}</h3>
                  <p className="text-[#A0A0A0]" style={{ fontSize: 14 }}>
                    {selected.date} • Outcome: {selected.outcome}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background: `${OUTCOME_COLORS[selected.outcome]}20`,
                    border: `1px solid ${OUTCOME_COLORS[selected.outcome]}`,
                    color: OUTCOME_COLORS[selected.outcome],
                  }}
                >
                  {selected.outcome}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Rule Version</span>
                  <p className="text-white mt-1 font-mono-code">{selected.ruleVersion}</p>
                </div>
                <div>
                  <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Risk Score</span>
                  <p className="text-white mt-1">{selected.riskScore}</p>
                </div>
                <div>
                  <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Owner</span>
                  <p className="text-white mt-1">{selected.owner}</p>
                </div>
                <div>
                  <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Regulatory Basis</span>
                  <p className="text-white mt-1" style={{ fontSize: 14 }}>
                    {selected.regulatoryBasis}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[#A0A0A0] text-xs uppercase tracking-wider block mb-2">
                  Input Data
                </span>
                <div
                  className="rounded-md p-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <pre
                    className="font-mono-code text-[#A0A0A0]"
                    style={{ fontSize: 12 }}
                  >
                    {JSON.stringify(selected.inputData, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[#A0A0A0] text-xs uppercase tracking-wider block mb-2">
                  Execution Path
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selected.executionPath.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="px-3 py-1.5 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <span className="text-white" style={{ fontSize: 12 }}>
                          {index + 1}. {step}
                        </span>
                      </div>
                      {index < selected.executionPath.length - 1 && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-white/30"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-md"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#A0A0A0",
                  }}
                >
                  Share
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-white text-black hover:bg-white/90"
                >
                  Export Audit Report (PDF)
                </button>
              </div>
            </div>
          ) : (
            <div
              className="rounded-lg p-12 text-center"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/20 mx-auto mb-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <p className="text-[#A0A0A0]" style={{ fontSize: 14 }}>
                Select a decision to view its reconstruction
              </p>
            </div>
          )}

          <p
            className="text-center mt-6 italic"
            style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}
          >
            Deterministic replay. Every decision. On demand.
          </p>
        </div>
      </div>
    </div>
  );
}
