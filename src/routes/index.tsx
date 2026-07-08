import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef } from "react";
import { SplineEmbed } from "@/components/landing/SplineHero";
import { ScrollTextOverlay } from "@/components/landing/ScrollText";
import { StatCounter } from "@/components/landing/StatCounter";
import { ParallaxLine } from "@/components/landing/ParallaxLine";

export const Route = createFileRoute("/")({
  component: Landing,
});

const SCENE_HERO = "https://prod.spline.design/Wgh2R948btMWEhCh/scene.splinecode";
const SCENE_JOURNEY = "https://prod.spline.design/NDNHBHAMxQH8ihFx/scene.splinecode";
const SCENE_CUBE = "https://prod.spline.design/6564cd15-6bcb-4024-a818-424db80c0071/scene.splinecode";
const SCENE_DISTORT = "https://prod.spline.design/Wgh2R948btMWEhCh/scene.splinecode";

const BG = "#0a0a0c";

function Btn({
  children,
  variant = "solid",
  href,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
  className?: string;
}) {
  const base =
    "font-display font-semibold rounded-md transition-colors inline-flex items-center justify-center";
  const styles =
    variant === "solid"
      ? "bg-white text-black hover:bg-white/90"
      : "bg-transparent text-white border border-white/50 hover:bg-white/5";
  return (
    <motion.a
      href={href ?? "#"}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${styles} ${className}`}
      style={{ padding: "14px 32px", pointerEvents: "auto" }}
    >
      {children}
    </motion.a>
  );
}

function StatusPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="font-display text-xs"
      style={{
        color,
        background: `${color}26`,
        border: `1px solid ${color}`,
        padding: "4px 12px",
        borderRadius: 100,
      }}
    >
      {label}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  footer,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  footer?: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="glass-card flex flex-col"
      style={{ padding: 40, minHeight: 320 }}
    >
      <div className="text-white mb-6 opacity-90">{icon}</div>
      <h3
        className="font-display font-bold text-white mb-3"
        style={{ fontSize: 22, lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <p className="text-[#A0A0A0] flex-1" style={{ fontSize: 15, lineHeight: 1.6 }}>
        {body}
      </p>
      {footer && <div className="mt-6">{footer}</div>}
    </motion.div>
  );
}

function Landing() {
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <main style={{ background: BG }} className="min-h-screen text-white overflow-x-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative w-screen" style={{ height: "100vh" }}>
        {/* Full-bleed background scene */}
        <SplineEmbed scene={SCENE_HERO} />

        {/* Split cube on right (desktop only) — placed BELOW overlay so it stays interactive */}
        <div
          className="hidden lg:block absolute top-0 right-0 h-full pointer-events-auto"
          style={{ width: "45%", zIndex: 5 }}
        >
          <SplineEmbed scene={SCENE_CUBE} />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 10, pointerEvents: "none" }}
        >
          {/* Logo mark */}
          <div
            className="absolute flex items-center gap-3"
            style={{ top: 24, left: 32, pointerEvents: "auto" }}
          >
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: 20, letterSpacing: "-0.02em" }}
            >
              RuleIQ
            </span>
            <span className="text-white/30">/</span>
            <span className="text-[#A0A0A0]" style={{ fontSize: 11 }}>
              Govern What Runs Your Business
            </span>
          </div>

          {/* Center content — constrained to left half on desktop so cube is visible */}
          <div className="absolute inset-0 flex items-center px-6 lg:px-16">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display font-black uppercase text-white"
                style={{
                  fontSize: "clamp(2.25rem, 5.5vw, 5.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  maxWidth: 800,
                }}
              >
                Most business rules outlive the people who wrote them.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="mt-6 text-white"
                style={{ fontSize: 18, maxWidth: 620 }}
              >
                41 IRDAI updates. ₹11.21 lakh crore in daily decisions. Zero governance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-10 flex gap-4 flex-wrap justify-center lg:justify-start"
              >
                <Btn variant="solid" href="#features">
                  See RuleIQ →
                </Btn>
                <Btn variant="ghost" href="#cta">
                  Login
                </Btn>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ bottom: 32, pointerEvents: "none" }}
          >
            <div className="relative w-px h-10 bg-white/40">
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span
              className="text-white uppercase"
              style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.4 }}
            >
              scroll
            </span>
          </div>
        </div>
      </section>

      {/* DISTORTION / TRANSITION SPLINE */}
      <section className="relative w-screen" style={{ height: "60vh" }}>
        <SplineEmbed scene={SCENE_DISTORT} />
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ zIndex: 10, pointerEvents: "none" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display font-black text-white text-center uppercase tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Hover. Scroll. Watch it warp.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — JOURNEY */}
      <section
        ref={journeyRef}
        className="relative w-screen"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 w-screen h-screen overflow-hidden">
          <SplineEmbed scene={SCENE_JOURNEY} />
          <ScrollTextOverlay containerRef={journeyRef} />
        </div>
      </section>

      {/* SECTION 3 — STATS */}
      <section style={{ padding: "120px 24px", background: BG }}>
        <p
          className="text-white text-center uppercase mb-20"
          style={{ fontSize: 12, letterSpacing: "0.25em", opacity: 0.5 }}
        >
          The Cost of Unowned Rules
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatCounter
            value={47.4}
            prefix="₹"
            suffix="L Cr"
            delay={0}
            format={(n) => n.toFixed(1)}
            label="Digital lending decisions made daily on rules nobody governs."
          />
          <StatCounter
            value={41}
            delay={0.15}
            label="IRDAI regulatory updates issued annually. Each one a manual chase."
          />
          <StatCounter
            value={304}
            delay={0.3}
            label="RBI enforcement actions in 2024 alone. Design failures, per the RBI."
          />
          <StatCounter
            value={6}
            suffix=" Weeks"
            delay={0.45}
            label="Average time to change one hardcoded business rule."
          />
        </div>
        <div className="max-w-6xl mx-auto mt-20 h-px bg-white/[0.08]" />
      </section>

      {/* SECTION 4 — FEATURES */}
      <section id="features" style={{ padding: "120px 24px", background: BG }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display font-black text-white text-center uppercase mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            What RuleIQ Does
          </h2>
          <p
            className="text-[#A0A0A0] text-center mb-20 mx-auto"
            style={{ fontSize: 18, maxWidth: 640 }}
          >
            Four capabilities. One governance layer. Zero orphaned rules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              delay={0}
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h13a2 2 0 012 2v14H6a2 2 0 01-2-2V4z" />
                  <path d="M8 10l2 2 4-4" />
                </svg>
              }
              title="Every Rule. One Owner. Full Accountability."
              body="No more orphaned logic making crore-level decisions nobody can explain. Every rule visible, versioned, and owned. The developer who wrote it can leave. The rule stays documented."
              footer={
                <div className="flex flex-wrap gap-2">
                  <StatusPill label="Approved" color="#10B981" />
                  <StatusPill label="Needs Review" color="#F59E0B" />
                  <StatusPill label="Zombie" color="#EF4444" />
                </div>
              }
            />
            <FeatureCard
              delay={0.1}
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
              title="Simulate Before You Deploy."
              body="Load any RBI or IRDAI circular. Replay 100,000 historical decisions against the proposed rule change. See compliance coverage, revenue impact in rupees, and deployment risk — before a single rule touches production."
              footer={
                <p className="italic text-white/50" style={{ fontSize: 13 }}>
                  Every BRE logs backward. Ours simulates forward.
                </p>
              }
            />
            <FeatureCard
              delay={0.2}
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="19" cy="6" r="2" />
                  <circle cx="19" cy="18" r="2" />
                  <path d="M7 12l10-6M7 12l10 6" />
                </svg>
              }
              title="One Rule Touches Everything."
              body="One lending rule touches fraud detection. Fraud touches KYC. KYC touches AML. RuleIQ maps the entire cascade in real time — so you know this circular changes 42 downstream decisions before you deploy it. Every other engine treats rules as isolated. Ours treats them as a system."
            />
            <FeatureCard
              delay={0.3}
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12h3l3-8 4 16 3-8h5" />
                </svg>
              }
              title="Nothing Changed. Everything Shifted."
              body="Approval rate drops from 68% to 42%. No rule was edited. No deployment happened. RuleIQ monitors rule behaviour in real time and flags drift the moment it starts — amber warning at 10% deviation, crimson critical alert at 25%. Drift is not a rule problem. It is a behaviour problem. Nobody else is measuring it."
              footer={
                <div className="flex flex-wrap gap-2">
                  <StatusPill label="Amber at 10%" color="#F59E0B" />
                  <StatusPill label="Crimson at 25%" color="#EF4444" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 — PARALLAX LINE */}
      <ParallaxLine />

      {/* SECTION 6 — AUTH CTA */}
      <section
        id="cta"
        className="flex items-center justify-center px-6"
        style={{ padding: "120px 24px", background: BG }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center"
          style={{
            maxWidth: 480,
            padding: 64,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
          }}
        >
          <p
            className="uppercase text-white mb-6"
            style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.4 }}
          >
            Get Started
          </p>
          <h3
            className="font-display font-extrabold text-white mb-3"
            style={{ fontSize: 32, lineHeight: 1.15 }}
          >
            Start Governing Your Rules.
          </h3>
          <p className="text-[#A0A0A0] mb-10" style={{ fontSize: 15, lineHeight: 1.6 }}>
            Join the teams who know exactly what their rules do, who owns them, and what changes
            before it deploys.
          </p>
          <div className="flex flex-col gap-3">
            <Btn variant="solid" href="/sign-up" className="w-full">
              Create Account
            </Btn>
            <Btn variant="ghost" href="/sign-in" className="w-full">
              Sign In
            </Btn>
          </div>
        </motion.div>
      </section>
      <p
        className="text-white text-center"
        style={{ marginTop: -80, marginBottom: 80, fontSize: 13, opacity: 0.3 }}
      >
        No credit card. No commitment. Just governance.
      </p>

      {/* FOOTER */}
      <footer
        style={{
          padding: "48px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: BG,
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <div
              className="font-display font-bold text-white"
              style={{ fontSize: 18 }}
            >
              RuleIQ
            </div>
            <div className="text-[#A0A0A0] mt-1" style={{ fontSize: 13, opacity: 0.5 }}>
              Govern What Runs Your Business
            </div>
          </div>
          <nav className="flex gap-6 md:justify-center flex-wrap">
            {["Features", "Dashboard", "Docs", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[#A0A0A0] transition-opacity hover:text-white"
                style={{ fontSize: 14, opacity: 0.5 }}
              >
                {l}
              </a>
            ))}
          </nav>
          <div
            className="text-[#A0A0A0] md:text-right"
            style={{ fontSize: 13, opacity: 0.4 }}
          >
            Built for Indian BFSI. Compliant by design.
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-white" style={{ fontSize: 12, opacity: 0.2 }}>
            © 2026 RuleIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
