import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-bg-grid" aria-hidden="true" />

      <div className="footer-cta">
        <h2 className="footer-cta-text">
          Let's work together and{" "}
          <span className="accent">build something great!</span>
        </h2>
        <FooterGraphic />
      </div>

      <div className="footer-contact-row">
        <a className="footer-contact-link primary" href="mailto:aayan.shazim@gmail.com">
          aayan.shazim@gmail.com
        </a>
        <a className="footer-contact-link" href="https://github.com/Ersatz-xD" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="footer-contact-link" href="https://www.linkedin.com/in/ayaan-ahmed-khan-448600351/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="footer-bottom">
        <nav className="footer-nav" aria-label="Footer navigation">
          
          <nav className="footer-nav" aria-label="Footer navigation">
  <a href="#experience">Experience</a>
  <Link to="/projects">All Projects</Link>
  <Link to="/credentials">Credentials</Link>
</nav>
        </nav>
        <span className="footer-meta">© {new Date().getFullYear()} Ayaan Ahmed Khan — Built with React &amp; TypeScript</span>
      </div>
    </footer>
  );
}

function FooterGraphic() {
  return (
    <svg
      className="footer-cta-graphic"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="footerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#1A8CFF" strokeWidth="1.2" opacity="0.5">
        <line x1="60" y1="60" x2="60" y2="10" />
        <line x1="60" y1="60" x2="102" y2="35" />
        <line x1="60" y1="60" x2="102" y2="85" />
        <line x1="60" y1="60" x2="60" y2="110" />
        <line x1="60" y1="60" x2="18" y2="85" />
        <line x1="60" y1="60" x2="18" y2="35" />
      </g>
      <g filter="url(#footerGlow)">
        <circle className="fn-pulse" cx="60" cy="60" r="8" fill="#00E5FF" />
        <circle className="fn-pulse" cx="60" cy="10" r="4" fill="#1A8CFF" />
        <circle className="fn-pulse" cx="102" cy="35" r="4" fill="#00E5FF" />
        <circle className="fn-pulse" cx="102" cy="85" r="4" fill="#1A8CFF" />
        <circle className="fn-pulse" cx="60" cy="110" r="4" fill="#00E5FF" />
        <circle className="fn-pulse" cx="18" cy="85" r="4" fill="#1A8CFF" />
        <circle className="fn-pulse" cx="18" cy="35" r="4" fill="#00E5FF" />
      </g>
    </svg>
  );
}