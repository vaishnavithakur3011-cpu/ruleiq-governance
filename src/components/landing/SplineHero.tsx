import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const BG = "#080B14";

function useHideSplineText() {
  useEffect(() => {
    const hideCanvasSiblings = () => {
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((canvas) => {
        let sibling = canvas.nextSibling as HTMLElement | null;
        while (sibling) {
          if (sibling.style) {
            sibling.style.display = "none";
            sibling.style.visibility = "hidden";
            sibling.style.opacity = "0";
          }
          sibling = sibling.nextSibling as HTMLElement | null;
        }
        const parent = canvas.parentElement;
        if (parent) {
          Array.from(parent.children).forEach((child) => {
            const el = child as HTMLElement;
            if (child !== canvas && el.style) {
              el.style.display = "none";
              el.style.visibility = "hidden";
              el.style.opacity = "0";
            }
          });
        }
      });
    };

    const timer = setTimeout(hideCanvasSiblings, 500);

    const observer = new MutationObserver(() => {
      hideCanvasSiblings();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

export function SplineEmbed({ scene }: { scene: string }) {
  const [isMobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [lowMemory, setLowMemory] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (mem !== undefined && mem < 4) {
      setLowMemory(true);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useHideSplineText();

  const shouldRenderScene = mounted && !isMobile && !lowMemory && inView;

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ background: BG }}>
      {shouldRenderScene && (
        <Suspense fallback={<div className="absolute inset-0" style={{ background: BG }} />}>
          <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
            <Spline scene={scene} style={{ width: "100%", height: "100%", pointerEvents: "auto" }} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
