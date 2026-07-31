import { useEffect, useMemo, useState } from "react";

const HEADLINE_TEXT =
  "I architect resilient full-stack systems, autonomous AI pipelines, and high-performance algorithms.";
const ACCENT_WORDS = new Set(["resilient", "autonomous", "high-performance"]);

export interface HeadlineWord {
  key: string;
  text: string;
  accent: boolean;
  visible: boolean;
  delay: number;
}

export function useHeadlineWords(start: boolean, reduceMotion: boolean): HeadlineWord[] {
  const words = useMemo(() => HEADLINE_TEXT.split(" "), []);
  const [visible, setVisible] = useState<boolean[]>(() => words.map(() => false));

  useEffect(() => {
    if (!start) return;
    const timers = words.map((_, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, reduceMotion ? 0 : i * 55)
    );
    return () => timers.forEach(clearTimeout);
  }, [start, reduceMotion, words]);

  return words.map((w, i) => ({
    key: `${i}-${w}`,
    text: w,
    accent: ACCENT_WORDS.has(w.replace(/[^a-zA-Z-]/g, "")),
    visible: visible[i],
    delay: i * 55,
  }));
}