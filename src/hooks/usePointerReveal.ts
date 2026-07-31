import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function usePointerReveal(
  revealLayerRef: React.RefObject<HTMLDivElement>,
  heroFigureRef: React.RefObject<HTMLDivElement>,
  figureRevealRef: React.RefObject<HTMLImageElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: mouse.x, y: mouse.y };
    let hasMoved = false;
    let rafId = 0;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
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

      revealLayerRef.current?.style.setProperty("--mx", `${smooth.x}px`);
      revealLayerRef.current?.style.setProperty("--my", `${smooth.y}px`);

      const rect = heroFigureRef.current?.getBoundingClientRect();
      if (rect) {
        figureRevealRef.current?.style.setProperty("--fx", `${smooth.x - rect.left}px`);
        figureRevealRef.current?.style.setProperty("--fy", `${smooth.y - rect.top}px`);
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      if (hasMoved) {
        const x = smooth.x * dpr;
        const y = smooth.y * dpr;
        const r = 90 * dpr;
        ctx.save();
        ctx.strokeStyle = "rgba(0,229,255,0.55)";
        ctx.lineWidth = dpr;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = "rgba(0,229,255,0.25)";
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
  }, [reduceMotion, revealLayerRef, heroFigureRef, figureRevealRef, canvasRef]);
}