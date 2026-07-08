import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DependencyGraph } from "@/components/landing/DependencyGraph";
import { mockRules } from "@/lib/mock-data";
import type { GraphNode } from "@/lib/types";

export const Route = createFileRoute("/dashboard/graph")({
  component: Graph,
});

const STATUS_COLORS: Record<string, string> = {
  approved: "#10B981",
  review: "#F59E0B",
  zombie: "#EF4444",
};

function Graph() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [impactRadius, setImpactRadius] = useState(false);

  const selectedRule = selectedNode
    ? mockRules.find((r) => r.id === selectedNode.id)
    : null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-white" style={{ fontSize: 28 }}>
          Dependency Graph
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-[#A0A0A0]" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              checked={impactRadius}
              onChange={(e) => setImpactRadius(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-transparent"
            />
            Impact Radius
          </label>
        </div>
      </div>

      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          height: "calc(100vh - 200px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
        }}
      >
        <DependencyGraph
          height={window.innerHeight - 200}
          showPanel={false}
          onNodeClick={(node) => setSelectedNode(node)}
        />
      </div>

      {/* Right panel */}
      {selectedRule && (
        <div
          className="fixed right-0 top-16 bottom-0 w-[360px] overflow-y-auto"
          style={{
            background: "rgba(8,11,20,0.95)",
            backdropFilter: "blur(16px)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            zIndex: 100,
            padding: 24,
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <h3 className="font-display font-bold text-white text-xl">{selectedRule.name}</h3>
          <p className="text-[#A0A0A0] mt-2" style={{ fontSize: 14 }}>
            {selectedRule.description}
          </p>

          <div className="mt-6">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Owner</span>
            <p className="text-white mt-1">{selectedRule.owner}</p>
          </div>

          <div className="mt-4">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Team</span>
            <p className="text-white mt-1">{selectedRule.team}</p>
          </div>

          <div className="mt-4">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Health Score</span>
            <p className="text-white mt-1">{selectedRule.healthScore}%</p>
          </div>

          <div className="mt-4">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Status</span>
            <div className="mt-1">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: `${STATUS_COLORS[selectedRule.status]}20`,
                  border: `1px solid ${STATUS_COLORS[selectedRule.status]}`,
                  color: STATUS_COLORS[selectedRule.status],
                }}
              >
                {selectedRule.status}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">Dependencies</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedRule.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#A0A0A0",
                  }}
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <span className="text-[#A0A0A0] text-xs uppercase tracking-wider">IF/THEN Logic</span>
            <div
              className="mt-2 rounded-md p-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <pre
                className="font-mono-code text-[#A0A0A0] whitespace-pre-wrap"
                style={{ fontSize: 11 }}
              >
                {selectedRule.ifThenLogic}
              </pre>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setSelectedNode(null)}
              className="flex-1 py-2 rounded-md text-[#A0A0A0] hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Close
            </button>
            <button
              className="flex-1 py-2 rounded-md bg-white text-black hover:bg-white/90"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
