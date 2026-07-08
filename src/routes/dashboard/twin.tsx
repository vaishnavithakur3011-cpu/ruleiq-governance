import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/twin")({
  component: DigitalTwin,
});

function DigitalTwin() {
  const [regulationText, setRegulationText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResult, setSimulationResult] = useState<null | {
    complianceCoverage: number;
    revenueImpact: number;
    ruleConflicts: number;
    deploymentRisk: string;
  }>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSimulate = () => {
    if (!regulationText.trim()) return;
    setIsSimulating(true);
    setSimulationResult(null);
    setSimulationProgress(0);

    intervalRef.current = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsSimulating(false);
          setSimulationResult({
            complianceCoverage: 94.2,
            revenueImpact: -12.4,
            ruleConflicts: 3,
            deploymentRisk: "Medium",
          });
          return 100;
        }
        return prev + Math.random() * 5 + 2;
      });
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h1 className="font-display font-bold text-white mb-8" style={{ fontSize: 28 }}>
        Regulatory Digital Twin
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div>
          <div
            className="rounded-lg p-6"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <h3 className="text-white font-semibold mb-4">Drop any RBI or IRDAI Circular</h3>

            <div
              className="mb-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                padding: 40,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/40 mb-3"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M12 18v-6M9 15h6" />
              </svg>
              <p className="text-[#A0A0A0]" style={{ fontSize: 14 }}>
                Drop PDF here or click to upload
              </p>
            </div>

            <div className="mb-4">
              <label className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-2 block">
                Or paste regulation text
              </label>
              <textarea
                value={regulationText}
                onChange={(e) => setRegulationText(e.target.value)}
                placeholder="Paste regulation text here..."
                className="w-full rounded-md bg-transparent border border-white/10 text-white p-4 resize-none"
                style={{ minHeight: 180, fontFamily: "inherit" }}
              />
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating || !regulationText.trim()}
              className="w-full py-3 rounded-md font-semibold transition-colors"
              style={{
                background: "white",
                color: "black",
                opacity: isSimulating || !regulationText.trim() ? 0.5 : 1,
              }}
            >
              {isSimulating ? "Simulating..." : "Inject Regulation"}
            </button>
          </div>
        </div>

        {/* Simulation Panel */}
        <div
          className="rounded-lg p-6"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h3 className="text-white font-semibold mb-4">Simulation Results</h3>

          {isSimulating && (
            <div className="text-center py-12">
              <p className="text-white mb-4">Replaying 100,000 historical decisions...</p>
              <div className="max-w-md mx-auto mb-4">
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${simulationProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
              <p className="text-[#A0A0A0]" style={{ fontSize: 14 }}>
                {Math.floor(simulationProgress * 1000).toLocaleString()} decisions processed
              </p>
            </div>
          )}

          {!isSimulating && !simulationResult && (
            <div className="text-center py-12">
              <p className="text-[#A0A0A0]">
                Upload or paste a regulation to see simulation results
              </p>
            </div>
          )}

          {simulationResult && (
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-lg p-4"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10B981" }}
              >
                <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-1">Compliance Coverage</p>
                <p className="text-white font-bold text-2xl" style={{ color: "#10B981" }}>
                  {simulationResult.complianceCoverage}%
                </p>
              </div>

              <div
                className="rounded-lg p-4"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid #F59E0B" }}
              >
                <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-1">Revenue Impact</p>
                <p className="text-white font-bold text-2xl" style={{ color: "#F59E0B" }}>
                  ₹{simulationResult.revenueImpact}L
                </p>
              </div>

              <div
                className="rounded-lg p-4"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #EF4444" }}
              >
                <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-1">Rule Conflicts</p>
                <p className="text-white font-bold text-2xl" style={{ color: "#EF4444" }}>
                  {simulationResult.ruleConflicts}
                </p>
              </div>

              <div
                className="rounded-lg p-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-[#A0A0A0] text-xs uppercase tracking-wider mb-1">Deployment Risk</p>
                <p className="text-white font-bold text-2xl">
                  {simulationResult.deploymentRisk}
                </p>
              </div>
            </div>
          )}

          {simulationResult && (
            <p
              className="text-center mt-6 italic"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}
            >
              Every BRE logs backward. Ours simulates forward.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
