import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useEduPointerReveal(
  sectionRef: React.RefObject<HTMLElement>,
  revealLayerRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: mouse.x, y: mouse.y };
    let hasMoved = false;
    let rafId = 0;

    function resizeCanvas() {
      const rect = section!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + "px";
      canvas!.style.height = rect.height + "px";
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasMoved = true;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    function loop() {
      if (!reduceMotion) {
        smooth.x += (mouse.x - smooth.x) * 0.1;
        smooth.y += (mouse.y - smooth.y) * 0.1;
      } else {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      }

      const rect = section!.getBoundingClientRect();
      const localX = smooth.x - rect.left;
      const localY = smooth.y - rect.top;

      revealLayerRef.current?.style.setProperty("--mx", `${localX}px`);
      revealLayerRef.current?.style.setProperty("--my", `${localY}px`);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const inBounds = localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height;

      if (hasMoved && inBounds) {
        const x = localX * dpr;
        const y = localY * dpr;
        const r = 90 * dpr;
        ctx.save();
        ctx.strokeStyle = "rgba(255,59,78,0.55)";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = "rgba(255,59,78,0.25)";
        ctx.beginPath(); ctx.moveTo(x - r * 1.3, y); ctx.lineTo(x - r * 0.7, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + r * 0.7, y); ctx.lineTo(x + r * 1.3, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - r * 1.3); ctx.lineTo(x, y - r * 0.7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y + r * 0.7); ctx.lineTo(x, y + r * 1.3); ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion, sectionRef, revealLayerRef, canvasRef]);
}