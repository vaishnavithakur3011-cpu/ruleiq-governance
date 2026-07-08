import { lazy, Suspense, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineEmbed({ scene }: { scene: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted || isMobile) {
    return <div className="absolute inset-0" style={{ background: "#0a0a0c" }} />;
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<div className="absolute inset-0" style={{ background: "#0a0a0c" }} />}>
        <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
      </Suspense>
    </div>
  );
}
