import { useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const BG = "#080B14";

export function ParticleNetwork() {
  const [counter, setCounter] = useState(2847291);
  const counterRef = useRef(counter);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadSlim();
  }, []);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const increment = Math.floor(Math.random() * 4) + 1;
      counterRef.current += increment;
      setCounter(counterRef.current);
    }, 800);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const particlesOptions = useCallback(
    () => ({
      background: {
        transparent: true,
      },
      fpsLimit: 60,
      particles: {
        color: { value: "#ffffff" },
        opacity: { value: 0.15 },
        size: { value: 1.5 },
        number: { value: 80 },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none" as const,
          random: true,
        },
        links: {
          enable: true,
          color: "#ffffff",
          opacity: 0.06,
          distance: 150,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { mode: "connect" },
          onClick: { mode: "push" },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const problemStatements = [
    { text: "RULES LIVE IN CODE.", delay: 0 },
    { text: "NOT PEOPLE.", delay: 0.2 },
    { text: "WHOSE PROBLEM IS THAT?", delay: 0.4, isAccent: true },
  ];

  return (
    <section
      className="relative"
      style={{ padding: "100px 24px", background: BG, overflow: "hidden" }}
    >
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 z-0"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <p
          className="text-white uppercase mb-8"
          style={{ fontSize: 12, letterSpacing: "0.25em", opacity: 0.5 }}
        >
          Rules Currently Running Without an Owner:
        </p>

        <div
          className="font-display font-black text-white"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          {counter.toLocaleString()}
        </div>

        <p className="text-[#A0A0A0] mt-4" style={{ fontSize: 14 }}>
          and counting. Right now. In production.
        </p>

        <div className="mt-20 space-y-6">
          {problemStatements.map((statement, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: statement.delay, ease: "easeOut" }}
              className="font-display font-black uppercase"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                color: statement.isAccent ? "#F59E0B" : "#ffffff",
              }}
            >
              {statement.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
