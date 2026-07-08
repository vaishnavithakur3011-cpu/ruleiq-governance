import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "60vh", background: "#0a0a0c" }}
    >
      <span
        aria-hidden
        className="absolute left-4 md:left-16 font-display text-white select-none pointer-events-none"
        style={{ fontSize: 200, opacity: 0.04, lineHeight: 1 }}
      >
        “
      </span>
      <span
        aria-hidden
        className="absolute right-4 md:right-16 font-display text-white select-none pointer-events-none"
        style={{ fontSize: 200, opacity: 0.04, lineHeight: 1 }}
      >
        ”
      </span>
      <motion.h2
        style={{ y, fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        className="font-display font-black text-white text-center tracking-tight px-6 leading-tight"
      >
        Regulator walks in. You don't sweat.
      </motion.h2>
    </section>
  );
}
