import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useNeuralMask(maskRef: React.RefObject<HTMLDivElement>) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = maskRef.current;
    if (!el) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: mouse.x, y: mouse.y };
    let rafId = 0;

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
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
      el.style.setProperty("--mx", `${smooth.x}px`);
      el.style.setProperty("--my", `${smooth.y}px`);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion, maskRef]);
}