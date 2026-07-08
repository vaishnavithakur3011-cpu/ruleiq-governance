import { motion } from "framer-motion";

const BG = "#080B14";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  footer?: React.ReactNode;
  delay: number;
}

function FeatureCard({ icon, title, body, footer, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{
        borderColor: "rgba(255,255,255,0.2)",
        boxShadow: "0 0 30px rgba(255,255,255,0.04)",
      }}
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
      <p className="text-[#A0A0A0] flex-1" style={{ fontSize: 15, lineHeight: 1.7 }}>
        {body}
      </p>
      {footer && <div className="mt-6">{footer}</div>}
    </motion.div>
  );
}

function StatusPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="font-display text-xs inline-block"
      style={{
        color,
        background: `${color}26`,
        border: `1px solid ${color}`,
        padding: "4px 12px",
        borderRadius: 100,
        marginRight: 8,
      }}
    >
      {label}
    </span>
  );
}

export function FeatureCards() {
  return (
    <section id="features" style={{ padding: "120px 24px", background: BG }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-white text-center uppercase mb-4"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          What RuleIQ Does
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#A0A0A0] text-center mb-20 mx-auto"
          style={{ fontSize: 18, maxWidth: 640 }}
        >
          Four capabilities. One governance layer. Zero orphaned rules.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            delay={0}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            }
            title="Simulate Before You Deploy."
            body="Load any RBI or IRDAI circular. Replay 100,000 historical decisions against the proposed rule change. See compliance coverage, revenue impact in rupees, and deployment risk — before a single rule touches production."
            footer={
              <p className="italic text-white/40" style={{ fontSize: 13 }}>
                Every BRE logs backward. Ours simulates forward.
              </p>
            }
          />
          <FeatureCard
            delay={0.2}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
  );
}
