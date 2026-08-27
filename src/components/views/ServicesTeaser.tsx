import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { SERVICE_CATEGORIES } from "../../data/services";
import "../../styles/services-teaser.css";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "ai-ml": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="#FF3B4E" strokeWidth="1.6" />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="#C81E3A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "fullstack-web": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="4"
        width="18"
        height="13"
        rx="2"
        stroke="#FF3B4E"
        strokeWidth="1.6"
      />
      <path
        d="M8 21h8M12 17v4"
        stroke="#C81E3A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6"
        y="2"
        width="12"
        height="20"
        rx="2"
        stroke="#FF3B4E"
        strokeWidth="1.6"
      />
      <path
        d="M10 19h4"
        stroke="#C81E3A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="1.5"
        stroke="#FF3B4E"
        strokeWidth="1.6"
      />
      <path
        d="M8 20h8M12 16v4"
        stroke="#C81E3A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function ServicesTeaser() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="services" className="svc-teaser-section" ref={sectionRef}>
      <div className="svc-teaser-bg-grid" aria-hidden="true" />
      <div className="svc-teaser-header">
        <div className="svc-teaser-badge-num">06</div>
        <h2 className="svc-teaser-headline">
          Services // <span className="accent">What I Build</span>
        </h2>
        <p className="svc-teaser-subtext">
          I partner with founders and teams to ship production-grade software —
          from intelligent AI features to full-stack platforms, native apps, and
          desktop tools.
        </p>
      </div>

      <div className="svc-teaser-grid">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <div
            className="svc-teaser-card"
            key={cat.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <div className="svc-teaser-icon">{CATEGORY_ICONS[cat.id]}</div>
            <h3 className="svc-teaser-card-title">{cat.title}</h3>
            <p className="svc-teaser-card-blurb">{cat.blurb}</p>
          </div>
        ))}
      </div>

      <div className="svc-teaser-footer">
        <Link className="svc-teaser-cta" to="/services">
          View All Services
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}