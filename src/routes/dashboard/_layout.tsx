import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/_layout")({
  component: DashboardLayout,
});

const BG = "#080B14";
const SIDEBAR_BG = "#0D1117";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Rule Registry",
    href: "/dashboard/registry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h13a2 2 0 012 2v14H6a2 2 0 01-2-2V4z" />
        <path d="M8 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Dependency Graph",
    href: "/dashboard/graph",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 12l10-6M7 12l10 6" />
      </svg>
    ),
  },
  {
    label: "Digital Twin",
    href: "/dashboard/twin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Drift Detection",
    href: "/dashboard/drift",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h3l3-8 4 16 3-8h5" />
      </svg>
    ),
  },
  {
    label: "Compliance Time Machine",
    href: "/dashboard/timemachine",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-screen"
      style={{
        width: 240,
        background: SIDEBAR_BG,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="font-display font-bold text-white" style={{ fontSize: 20 }}>
          RuleIQ
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
            activeProps={{
              style: {
                color: "#ffffff",
                background: "rgba(255,255,255,0.08)",
                borderLeft: "2px solid #ffffff",
              },
            }}
          >
            {item.icon}
            <span style={{ fontSize: 14 }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)" }}
          >
            <span className="text-white font-semibold" style={{ fontSize: 14 }}>U</span>
          </div>
          <div className="flex-1">
            <p className="text-white" style={{ fontSize: 13 }}>User</p>
            <Link to="/sign-in" className="text-[#A0A0A0] hover:text-white" style={{ fontSize: 11 }}>
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header
      className="fixed top-0 right-0"
      style={{
        left: 240,
        height: 64,
        background: "rgba(8,11,20,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-white" style={{ fontSize: 14 }}>Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white/60 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function DashboardLayout() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <Sidebar />
      <TopBar />
      <main
        style={{
          marginLeft: 240,
          marginTop: 64,
          padding: 32,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
