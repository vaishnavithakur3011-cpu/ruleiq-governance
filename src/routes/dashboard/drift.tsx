import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { driftAlerts, mockRules } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/drift")({
  component: DriftDetection,
});

const STATUS_COLORS: Record<string, string> = {
  approved: "#10B981",
  review: "#F59E0B",
  zombie: "#EF4444",
};

// Mock chart data
const chartData = [
  { date: "Jun 01", approvalRate: 68 },
  { date: "Jun 05", approvalRate: 67 },
  { date: "Jun 10", approvalRate: 64 },
  { date: "Jun 15", approvalRate: 58 },
  { date: "Jun 20", approvalRate: 55 },
  { date: "Jun 25", approvalRate: 50 },
  { date: "Jun 28", approvalRate: 42 },
];

function DriftDetection() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const overallDriftLevel = driftAlerts.some((a) => a.status === "crimson")
    ? "crimson"
    : driftAlerts.some((a) => a.status === "amber")
    ? "amber"
    : "approved";

  return (
    <div>
      <h1 className="font-display font-bold text-white mb-8" style={{ fontSize: 28 }}>
        Drift Detection
      </h1>

      {/* Status Bar */}
      <div
        className="rounded-lg p-4 mb-8 flex items-center justify-between"
        style={{
          background: `${STATUS_COLORS[overallDriftLevel]}15`,
          border: `1px solid ${STATUS_COLORS[overallDriftLevel]}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: STATUS_COLORS[overallDriftLevel] }}
          />
          <span className="text-white font-semibold">
            Overall Drift Level: {overallDriftLevel.charAt(0).toUpperCase() + overallDriftLevel.slice(1)}
          </span>
        </div>
        <span className="text-[#A0A0A0]" style={{ fontSize: 13 }}>
          {driftAlerts.length} active alerts
        </span>
      </div>

      {/* Chart */}
      <div
        className="rounded-lg p-6 mb-8"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <h3 className="text-white font-semibold mb-4">Approval Rate Over Time</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#A0A0A0" fontSize={12} />
              <YAxis stroke="#A0A0A0" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "rgba(8,11,20,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fff" }}
              />
              <ReferenceLine
                y={58}
                stroke="#F59E0B"
                strokeDasharray="5 5"
                label={{ value: "-10%", fill: "#F59E0B", fontSize: 11 }}
              />
              <ReferenceLine
                y={51}
                stroke="#EF4444"
                strokeDasharray="5 5"
                label={{ value: "-25%", fill: "#EF4444", fontSize: 11 }}
              />
              <Line
                type="monotone"
                dataKey="approvalRate"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ fill: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Active Alerts</h3>
        <div className="space-y-4">
          {driftAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              className="rounded-lg p-4 cursor-pointer transition-colors"
              style={{
                background: `${STATUS_COLORS[alert.status]}10`,
                border: `1px solid ${STATUS_COLORS[alert.status]}`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 20 }}>
                    {alert.status === "crimson" ? "🔴" : "⚠️"}
                  </span>
                  <div>
                    <p className="text-white font-semibold">{alert.ruleName}</p>
                    <p className="text-[#A0A0A0] mt-1" style={{ fontSize: 13 }}>
                      {alert.message}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className="px-2 py-1 rounded-full text-xs"
                    style={{
                      background: `${STATUS_COLORS[alert.status]}20`,
                      color: STATUS_COLORS[alert.status],
                    }}
                  >
                    {alert.percentage}% drift
                  </span>
                  <p className="text-[#A0A0A0] mt-2" style={{ fontSize: 12 }}>
                    {alert.timestamp.slice(0, 10)}
                  </p>
                </div>
              </div>

              {selectedAlert === alert.id && (
                <div className="mt-4 pt-4 flex gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    View Rule
                  </button>
                  <button
                    className="px-4 py-2 rounded-md"
                    style={{ background: "white", color: "black" }}
                  >
                    Investigate
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historical Alerts Table */}
      <div>
        <h3 className="text-white font-semibold mb-4">Historical Alerts</h3>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <table className="w-full text-left">
            <thead style={{ background: "rgba(255,255,255,0.02)" }}>
              <tr>
                <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Rule</th>
                <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Status</th>
                <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Drift</th>
                <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Date</th>
                <th className="p-4 text-[#A0A0A0] text-xs uppercase tracking-wider font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {driftAlerts.map((alert, index) => (
                <tr
                  key={alert.id}
                  style={{
                    background: index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <td className="p-4 text-white font-semibold" style={{ fontSize: 14 }}>
                    {alert.ruleName}
                  </td>
                  <td className="p-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs"
                      style={{
                        background: `${STATUS_COLORS[alert.status]}20`,
                        color: STATUS_COLORS[alert.status],
                      }}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                    {alert.percentage}%
                  </td>
                  <td className="p-4 text-[#A0A0A0]" style={{ fontSize: 14 }}>
                    {alert.timestamp.slice(0, 10)}
                  </td>
                  <td className="p-4">
                    <button className="text-[#A0A0A0] hover:text-white" style={{ fontSize: 14 }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
