import { Link } from "react-router-dom";

interface MenuPanelProps {
  open: boolean;
}

const LINKS = [
  { idx: "01", label: "Home", href: "/" },
  { idx: "02", label: "Architecture & Projects", href: "/projects" },
  { idx: "03", label: "Credentials & Honors", href: "/credentials" },
];

export default function MenuPanel({ open }: MenuPanelProps) {
  return (
    <nav className="menu-panel" aria-hidden={!open}>
      <nav>
        {LINKS.map((l) => (
  <Link key={l.idx} to={l.href}>
    <span className="idx">{l.idx}</span>
    {l.label}
  </Link>
))}
        <Link to="/contact">
          <span className="idx">04</span>
          Terminal Contact
        </Link>
      </nav>
      <div className="menu-footer">
        <a className="email" href="mailto:aayan.shazim@gmail.com">aayan.shazim@gmail.com</a>
        <div className="socials">
          <a href="https://github.com/Ersatz-xD" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/ayaan-ahmed-khan-448600351/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </nav>
  );
}