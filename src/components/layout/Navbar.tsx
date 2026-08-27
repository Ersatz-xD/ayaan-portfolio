import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

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
const { theme, toggleTheme } = useTheme();

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
  className="theme-toggle"
  type="button"
  onClick={toggleTheme}
  aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
>
  <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
  <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12,2 A10,10 0 0,1 12,22 L12,2 Z" fill="currentColor" />
    <circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
  </svg>
</button>

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