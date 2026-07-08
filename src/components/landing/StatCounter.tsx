import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function StatCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  delay = 0,
  format,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => (format ? format(v) : Math.floor(v).toLocaleString()));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, delay, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
  }, [inView, value, delay, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div
        className="font-display font-black text-white leading-none tracking-tight"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
      >
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p
        className="mt-4 text-[#A0A0A0] text-sm leading-relaxed"
        style={{ maxWidth: 220 }}
      >
        {label}
      </p>
    </motion.div>
  );
}
