import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import MenuPanel from "./components/layout/MenuPanel";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import AllCredentials from "./pages/AllCredentials";

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
    <BrowserRouter>
      <ScrollToTop />
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MenuPanel open={menuOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/credentials" element={<AllCredentials />} />
      </Routes>
    </BrowserRouter>
  );
}