import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void; 
}

const LINKS = [
  { idx: "01", label: "Home", href: "/" },
  { idx: "02", label: "Projects", href: "/projects" },
  { idx: "03", label: "Services", href: "/services" },
  { idx: "04", label: "Credentials", href: "/credentials" },
  { idx: "05", label: "Contact", href: "/contact" },
];

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="logo-wrapper">
        <svg className="logo-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6 L18 20 L4 34" stroke="currentColor" strokeWidth="3" strokeLinecap="square" fill="none" />
          <path d="M36 6 L22 20 L36 34" stroke="currentColor" strokeWidth="3" strokeLinecap="square" fill="none" />
          <path d="M20 4 L14 36 M26 4 L20 36" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        </svg>
        <div className="logo-text">
          A · K<small>Full-Stack &amp; AI Eng.</small>
        </div>
      </div>

      <nav className="navbar-links" aria-label="Primary navigation">
        {LINKS.map((l) => (
          <Link
            key={l.idx}
            to={l.href}
            className={`navbar-link${location.pathname === l.href ? " active" : ""}`}
          >
            <span className="idx">{l.idx}</span>
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        className="burger-btn"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span><span></span><span></span>
      </button>

      <nav className="mobile-menu-panel" aria-hidden={!menuOpen}>
        <nav>
          {LINKS.map((l) => (
            <Link 
              key={l.idx} 
              to={l.href} 
              onClick={() => setMenuOpen(false)}
            >
              <span className="idx">{l.idx}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-footer">
          <a className="email" href="mailto:aayan.shazim@gmail.com">aayan.shazim@gmail.com</a>
          <div className="socials">
            <a href="https://github.com/Ersatz-xD" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ayaan-ahmed-khan-448600351/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>
    </header>
  );
}