import { useCallback, useEffect, useState } from "react";
import Header from "./components/layout/Header";
import MenuPanel from "./components/layout/MenuPanel";
import Hero from "./components/hero/Hero";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MenuPanel open={menuOpen} />
      <Hero />
    </>
  );
}