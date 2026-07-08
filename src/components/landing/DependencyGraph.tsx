import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { GraphData, GraphNode } from "@/lib/types";
import { graphData } from "@/lib/mock-data";

const ForceGraph3D = lazy(() => import("react-force-graph-3d"));

const BG = "#080B14";

const STATUS_COLORS: Record<string, string> = {
  approved: "#10B981",
  review: "#F59E0B",
  zombie: "#EF4444",
};

interface TooltipData {
  node: GraphNode;
  x: number;
  y: number;
  dependentCount: number;
}

interface DependencyGraphProps {
  height?: number;
  showPanel?: boolean;
  onNodeClick?: (node: GraphNode) => void;
}

export function DependencyGraph({ height = 600, showPanel = false, onNodeClick }: DependencyGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      setDimensions({ width: entry.contentRect.width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [height]);

  const getDependentCount = (nodeId: string): number => {
    return graphData.links.filter((link) => link.source === nodeId || link.target === nodeId).length;
  };

  const handleNodeHover = (node: GraphNode | null) => {
    if (node) {
      setHoverNode(node);
    } else {
      setHoverNode(null);
      setTooltip(null);
    }
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  const nodeColor = (node: GraphNode): string => {
    return STATUS_COLORS[node.status] || "#ffffff";
  };

  const nodeSize = (node: GraphNode): number => {
    return node.health / 10;
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      <Suspense
        fallback={
          <div
            className="w-full flex items-center justify-center"
            style={{ height, background: BG, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}
          >
            <p className="text-[#A0A0A0]">Loading graph...</p>
          </div>
        }
      >
        <ForceGraph3D
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeColor={nodeColor}
          nodeSize={nodeSize}
          linkColor={() => "rgba(255,255,255,0.2)"}
          linkWidth={1.5}
          backgroundColor={BG}
          nodeOpacity={1}
          linkOpacity={0.3}
          onNodeHover={handleNodeHover}
          onNodeClick={handleNodeClick}
          enableNodeDrag
          enableNavigationControls
          cameraPosition={{ x: 0, y: 0, z: 400 }}
        />
      </Suspense>

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(10px, 10px)",
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: "12px 16px",
              fontSize: 13,
              minWidth: 200,
            }}
          >
            <p className="text-white font-semibold" style={{ fontFamily: "Space Grotesk" }}>
              {tooltip.node.name}
            </p>
            <p className="text-[#A0A0A0] mt-1">Owner: {tooltip.node.owner}</p>
            <p className="text-[#A0A0A0]">Health: {tooltip.node.health}%</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: `${STATUS_COLORS[tooltip.node.status]}20`,
                  border: `1px solid ${STATUS_COLORS[tooltip.node.status]}`,
                  color: STATUS_COLORS[tooltip.node.status],
                }}
              >
                {tooltip.node.status.charAt(0).toUpperCase() + tooltip.node.status.slice(1)}
              </span>
            </div>
            <p className="text-[#A0A0A0] mt-2 text-xs">
              Affects {tooltip.dependentCount} downstream rules
            </p>
          </div>
        </div>
      )}

      {showPanel && selectedNode && (
        <motion.div
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          className="absolute top-0 right-0 w-[360px] h-full"
          style={{
            background: "rgba(8,11,20,0.95)",
            backdropFilter: "blur(16px)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            padding: 24,
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-white font-display font-bold text-xl">{selectedNode.name}</h3>
          <div className="mt-4 space-y-3">
            <p className="text-[#A0A0A0]">Owner: <span className="text-white">{selectedNode.owner}</span></p>
            <p className="text-[#A0A0A0]">Health Score: <span className="text-white">{selectedNode.health}%</span></p>
            <p className="text-[#A0A0A0]">
              Status:{" "}
              <span
                className="px-2 py-0.5 rounded-full text-xs ml-1"
                style={{
                  background: `${STATUS_COLORS[selectedNode.status]}20`,
                  border: `1px solid ${STATUS_COLORS[selectedNode.status]}`,
                  color: STATUS_COLORS[selectedNode.status],
                }}
              >
                {selectedNode.status}
              </span>
            </p>
            <p className="text-[#A0A0A0]">
              Dependencies: <span className="text-white">{getDependentCount(selectedNode.id)}</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function DependencyGraphSection() {
  return (
    <section className="relative" style={{ padding: "80px 24px", background: BG }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-white text-center uppercase"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          One Rule Touches Everything.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#A0A0A0] text-center mt-4"
          style={{ fontSize: 16 }}
        >
          Click any node. See what breaks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <DependencyGraph height={600} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#A0A0A0] text-center mt-8 italic"
          style={{ fontSize: 14 }}
        >
          Every line is a dependency. Every dependency is a risk nobody mapped.
        </motion.p>
      </div>
    </section>
  );
}
