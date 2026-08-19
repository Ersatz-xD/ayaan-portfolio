import { useCallback, useEffect, useState } from "react";
import { Routes, Route, HashRouter} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import AllCredentials from "./pages/AllCredentials";
import ServicesPage from "./pages/ServicesPage";
import Contact from "./pages/Contact";
import "./styles/footer.css";

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
    <HashRouter>
      <ScrollToTop />
      <Navbar menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/credentials" element={<AllCredentials />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}