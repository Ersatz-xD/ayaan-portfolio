interface MenuPanelProps {
  open: boolean;
}

const LINKS = [
  { idx: "01", label: "Architecture & ML", href: "#work" },
  { idx: "02", label: "System Architecture", href: "#systems" },
  { idx: "03", label: "Hackathons & CP", href: "#hackathons" },
  { idx: "04", label: "Terminal Contact", href: "#contact" },
];

export default function MenuPanel({ open }: MenuPanelProps) {
  return (
    <nav className="menu-panel" aria-hidden={!open}>
      <nav>
        {LINKS.map((l) => (
          <a key={l.idx} href={l.href}>
            <span className="idx">{l.idx}</span>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="menu-footer">
        <a className="email" href="mailto:aayan.shazim@gmail.com">aayan.shazim@gmail.com</a>
        <div className="socials">
          <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </nav>
  );
}