import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const TRANSITION_MS = 500;

const listeners = new Set<(theme: Theme) => void>();

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

let currentTheme: Theme = getInitialTheme();

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-transitioning");
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, TRANSITION_MS);
  }
  root.setAttribute("data-theme", theme);
}

// Apply immediately on module load so the correct theme is set
// before any component using this hook renders.
if (typeof document !== "undefined") {
  applyTheme(currentTheme, false);
}

function setGlobalTheme(theme: Theme) {
  if (theme === currentTheme) return;
  currentTheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme, true);
  listeners.forEach((listener) => listener(theme));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(currentTheme);

  useEffect(() => {
    const listener = (t: Theme) => setThemeState(t);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setGlobalTheme(currentTheme === "light" ? "dark" : "light");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setGlobalTheme(next);
  }, []);

  return { theme, toggleTheme, setTheme };
}
