import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useNeuralMask } from "../../hooks/useNeuralMask";
import NetworkGraph from "../hero/NetworkGraph";
import "../../styles/contact-view.css";

interface DispatchCard {
  id: string;
  index: string;
  label: string;
  value: string;
  sub?: string;
  actionLabel: string;
  href: string;
  copyValue?: string;
}

const CARDS: DispatchCard[] = [
  {
    id: "email",
    index: "01",
    label: "Email Dispatch",
    value: "aayan.shazim@gmail.com",
    actionLabel: "Send Email",
    href: "mailto:aayan.shazim@gmail.com",
  },
  {
    id: "linkedin",
    index: "02",
    label: "LinkedIn Profile",
    value: "Ayaan Ahmed Khan",
    actionLabel: "View Profile",
    href: "https://linkedin.com/in/ayaan-ahmed-khan-448600351",
  },
  {
    id: "github",
    index: "03",
    label: "GitHub Repository",
    value: "github.com/Ersatz-xD",
    actionLabel: "View Repositories",
    href: "https://github.com/Ersatz-xD",
  },
  {
    id: "phone",
    index: "04",
    label: "Secure Line & Location",
    value: "0300-2466536",
    sub: "Islamabad, Pakistan",
    actionLabel: "Call",
    href: "tel:03002466536",
    copyValue: "03002466536",
  },
];

export default function ContactView() {
  const reduceMotion = useReducedMotion();
  const maskRef = useRef<HTMLDivElement>(null!);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [emailCopied, setEmailCopied] = useState(false);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  useNeuralMask(maskRef);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(headerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo(
        cardsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );
    });
    return () => ctx.revert();
  }, [reduceMotion]);

  async function copyToClipboard(text: string, marker: string) {
    try {
      await navigator.clipboard.writeText(text);
      if (marker === "email") {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setCopiedCardId(marker);
        setTimeout(() => setCopiedCardId((cur) => (cur === marker ? null : cur)), 2000);
      }
    } catch {
      // clipboard API unavailable — fail silently, mailto/tel links still work
    }
  }

  return (
    <section id="contact" className="dispatch-page">
      <div className="dispatch-neural-bg" ref={maskRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <NetworkGraph />
        </svg>
      </div>
      <div className="dispatch-bg-grid" aria-hidden="true" />
      <div className="dispatch-bg-text" aria-hidden="true">DISPATCH</div>

      <div className="dispatch-container">
        <div className="dispatch-header" ref={headerRef}>
          <div className="dispatch-status-row">
            <p className="dispatch-tag">
              <span className="dot" />
              Based in Islamabad, Pakistan
            </p>
            <span className="dispatch-status-badge">
              <span className="status-pulse" />
              System_Status: Online
            </span>
          </div>

          <span className="dispatch-eyebrow">04 // Terminal Dispatch</span>

          <h1 className="dispatch-headline">
            INITIALIZE //<br />
            <span className="accent">CONNECTION</span>
          </h1>

          <p className="dispatch-subtext">
            Available for Machine Learning engineering internships, full-stack software development,
            and AI research collaborations. Choose a direct dispatch channel below.
          </p>

          <button
            className="dispatch-email-pill"
            onClick={() => copyToClipboard("aayan.shazim@gmail.com", "email")}
            aria-live="polite"
          >
            <span className="dispatch-email-text">aayan.shazim@gmail.com</span>
            <span className={`dispatch-copy-badge${emailCopied ? " copied" : ""}`}>
              {emailCopied ? (
                <>✓ Copied to Clipboard!</>
              ) : (
                <>
                  Copy Email
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M4 16V6a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>

        <div className="dispatch-grid">
          {CARDS.map((card, i) => (
            <div className="dispatch-card" key={card.id} ref={(el) => {cardsRef.current[i] = el}}>
              <span className="dispatch-card-index">{card.index} //</span>
              <span className="dispatch-card-label">{card.label}</span>
              <p className="dispatch-card-value">{card.value}</p>
              {card.sub && <p className="dispatch-card-sub">{card.sub}</p>}

             <div className="dispatch-card-actions">
                <a
                  className="dispatch-card-btn"
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {card.actionLabel}
                  <svg className="dispatch-card-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {card.copyValue && (
                  <button
                    className="dispatch-card-copy"
                    onClick={() => copyToClipboard(card.copyValue!, card.id)}
                  >
                    {copiedCardId === card.id ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}