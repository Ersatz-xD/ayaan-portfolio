interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header>
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
      <button
        className="burger-btn"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  );
}