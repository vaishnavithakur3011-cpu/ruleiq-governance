import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SplineEmbed } from "@/components/landing/SplineHero";
import { ParallaxLine } from "@/components/landing/ParallaxLine";
import { StatCounter } from "@/components/landing/StatCounter";
import { TextScramble } from "@/components/landing/TextScramble";
import { MagneticButton } from "@/components/landing/MagneticButton";
import { ParticleNetwork } from "@/components/landing/ParticleNetwork";
import { DependencyGraphSection } from "@/components/landing/DependencyGraph";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export const Route = createFileRoute("/")({
  component: Landing,
});

const SCENE_HERO = "https://prod.spline.design/Wgh2R948btMWEhCh/scene.splinecode";
const SCENE_CUBE = "https://prod.spline.design/6564cd15-6bcb-4024-a818-424db80c0071/scene.splinecode";
const SCENE_DISTORT = "https://prod.spline.design/Wgh2R948btMWEhCh/scene.splinecode";

const BG = "#080B14";

function CornerCovers() {
  const coverStyle = {
    position: "absolute" as const,
    width: 250,
    height: 80,
    background: BG,
    zIndex: 999,
    pointerEvents: "none" as const,
  };

  return (
    <>
      <div style={{ ...coverStyle, top: 0, left: 0 }} />
      <div style={{ ...coverStyle, top: 0, right: 0 }} />
      <div style={{ ...coverStyle, bottom: 0, left: 0 }} />
      <div style={{ ...coverStyle, bottom: 0, right: 0 }} />
    </>
  );
}

function HeroSection() {
  const [scrambleComplete, setScrambleComplete] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={parallaxRef}
      className="relative w-screen"
      style={{ height: "100vh", touchAction: "pan-y", background: BG }}
    >
      {/* Background Spline */}
      <ErrorBoundary>
        <SplineEmbed scene={SCENE_HERO} />
      </ErrorBoundary>
      <CornerCovers />

      {/* Cube on right (desktop only) */}
      <div
        className="hidden lg:block absolute top-0 right-0 h-full"
        style={{ width: "45%", zIndex: 5 }}
      >
        <ErrorBoundary>
          <SplineEmbed scene={SCENE_CUBE} />
        </ErrorBoundary>
        <CornerCovers />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ zIndex: 10, pointerEvents: "none" }}>
        {/* Logo */}
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

        {/* Center content */}
        <div className="absolute inset-0 flex items-center px-6 lg:px-16">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-black uppercase text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                maxWidth: 800,
              }}
            >
              <TextScramble
                text="MOST BUSINESS RULES OUTLIVE THE PEOPLE WHO WROTE THEM."
                onComplete={() => setScrambleComplete(true)}
              />
            </motion.h1>

            {scrambleComplete && (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mt-6 text-white"
                  style={{ fontSize: 18, maxWidth: 620 }}
                >
                  41 IRDAI updates. ₹11.21 lakh crore in daily decisions. Zero governance.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="mt-10 flex gap-4 flex-wrap justify-center lg:justify-start"
                >
                  <MagneticButton variant="solid" href="#features">
                    See RuleIQ →
                  </MagneticButton>
                  <MagneticButton variant="ghost" href="/sign-in">
                    Login
                  </MagneticButton>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ bottom: 32, pointerEvents: "none", y }}
        >
          <div className="relative w-px" style={{ height: 36, background: "rgba(255,255,255,0.4)" }}>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white"
              style={{ width: 5, height: 5 }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </div>
          <span
            className="text-white uppercase"
            style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.35 }}
          >
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{ padding: "120px 24px", background: BG }}>
      <p
        className="text-white text-center uppercase mb-20"
        style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.4 }}
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
          label="Digital lending decisions daily. Zero governance."
        />
        <StatCounter
          value={41}
          delay={0.15}
          label="IRDAI regulatory updates annually."
        />
        <StatCounter
          value={304}
          delay={0.3}
          label="RBI enforcement actions in 2024 alone."
        />
        <StatCounter
          value={6}
          suffix=" Weeks"
          delay={0.45}
          label="To change one hardcoded business rule."
        />
      </div>
      <div className="max-w-6xl mx-auto mt-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
    </section>
  );
}

function DistortionSection() {
  return (
    <section className="relative w-screen" style={{ height: "60vh", background: BG }}>
      <ErrorBoundary>
        <SplineEmbed scene={SCENE_DISTORT} />
      </ErrorBoundary>
      <CornerCovers />
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ zIndex: 10, pointerEvents: "none" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-black text-white text-center uppercase"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          Hover. Scroll. Watch it warp.
        </motion.p>
      </div>
    </section>
  );
}

function AuthCTA() {
  return (
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
        className="w-full"
        style={{
          maxWidth: 480,
          padding: 64,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          textAlign: "center",
        }}
      >
        <p
          className="text-white uppercase mb-6"
          style={{ fontSize: 11, letterSpacing: "0.25em", opacity: 0.35 }}
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
          Join the teams who know exactly what their rules do, who owns them, and what changes before it deploys.
        </p>
        <div className="flex flex-col gap-3">
          <MagneticButton variant="solid" href="/sign-up" className="w-full">
            Create Account
          </MagneticButton>
          <MagneticButton variant="ghost" href="/sign-in" className="w-full">
            Sign In
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "48px 32px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: BG,
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="font-display font-bold text-white" style={{ fontSize: 18 }}>
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
              className="text-[#A0A0A0] transition-colors hover:text-white"
              style={{ fontSize: 14, opacity: 0.5 }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="text-[#A0A0A0] md:text-right" style={{ fontSize: 13, opacity: 0.4 }}>
          Built for Indian BFSI. Compliant by design.
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto mt-10 pt-6 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="text-white" style={{ fontSize: 12, opacity: 0.15 }}>
          © 2026 RuleIQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main style={{ background: BG }} className="min-h-screen text-white overflow-x-hidden">
      {/* Section 1 — Hero with Spline and animations */}
      <HeroSection />

      {/* Section 2 — Particle Network with live counter */}
      <ParticleNetwork />

      {/* Section 3 — Statistics with CountUp */}
      <StatsSection />

      {/* Section 4 — Interactive Dependency Graph */}
      <DependencyGraphSection />

      {/* Section 5 — Feature Cards */}
      <FeatureCards />

      {/* Distortion transition */}
      <DistortionSection />

      {/* Section 6 — Parallax Statement */}
      <ParallaxLine />

      {/* Section 7 — Auth CTA */}
      <AuthCTA />

      {/* Section 8 — Footer */}
      <Footer />
    </main>
  );
}
