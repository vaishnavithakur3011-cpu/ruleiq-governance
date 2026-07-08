import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

interface TextScrambleProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

export function TextScramble({ text, className, onComplete }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const resolvedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const textArray = text.split("");
    let currentResolved = 0;

    const scramble = () => {
      const result = textArray.map((char, index) => {
        if (index < currentResolved) {
          return char;
        }
        if (char === " ") return " ";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplayText(result.join(""));

      if (currentResolved <= textArray.length) {
        currentResolved++;
        resolvedRef.current = currentResolved;
      }

      if (currentResolved > textArray.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onComplete?.();
      }
    };

    intervalRef.current = setInterval(scramble, 30);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, onComplete]);

  return <span className={className}>{displayText || text}</span>;
}
