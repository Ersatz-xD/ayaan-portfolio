import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type SplashPhase = "idle" | "animate" | "fade" | "hidden";

export function useSplashIntro() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<SplashPhase>(reduceMotion ? "hidden" : "idle");
  const [contentVisible, setContentVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("hidden");
      setContentVisible(true);
      return;
    }

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("animate"));
    });

    const endTimer = setTimeout(() => {
      setPhase("fade");
      setContentVisible(true);
      setTimeout(() => setPhase("hidden"), 380);
    }, 1350);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(endTimer);
    };
  }, [reduceMotion]);

 useEffect(() => {
    document.body.classList.toggle("no-scroll", !contentVisible);
  }, [contentVisible]);

  return { phase, contentVisible, reduceMotion };
}