import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const LINES = [
  { text: "RULES LIVE IN CODE. NOT PEOPLE.", start: 0.0, end: 0.25 },
  { text: "CHANGE TAKES A TICKET. NOT A THOUGHT.", start: 0.25, end: 0.5 },
  { text: "AUDIT MEANS GUESSING. NOT KNOWING.", start: 0.5, end: 0.75 },
  { text: "RULEIQ FIXES ALL THREE.", start: 0.75, end: 1.0 },
];

function Line({
  progress,
  start,
  end,
  text,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  text: string;
}) {
  const mid = (start + end) / 2;
  const opacity = useTransform(
    progress,
    [start, start + (mid - start) * 0.5, end - (end - mid) * 0.5, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [20, 0, -20]);

  return (
    <motion.h2
      style={{ opacity, y }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-white text-center uppercase tracking-tight px-6"
    >
      <span style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1 }}>{text}</span>
    </motion.h2>
  );
}

export function ScrollTextOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {LINES.map((l) => (
        <Line key={l.text} progress={scrollYProgress} start={l.start} end={l.end} text={l.text} />
      ))}
    </div>
  );
}
