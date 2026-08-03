import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "../../styles/experience.css";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceEntry {
  id: string;
  period: string;
  organization: string;
  role: string;
  description: string;
}

const ENTRIES: ExperienceEntry[] = [
  {
    id: "exp-01",
    period: "Apr 2026 – Jun 2026",
    organization: "10Pearls (Shine Program)",
    role: "Data Science Intern",
    description:
      "Selected for a competitive industry-led internship. Developing and optimizing data-driven machine learning solutions, MLOps pipelines, and computational analytical workflows.",
  },
  {
    id: "exp-02",
    period: "Jun 2025 – Aug 2025",
    organization: "ACM CUI Wah Chapter",
    role: "Frontend Developer & Lead (Intern)",
    description:
      "Directed a formal 9-week intensive internship to architect and deploy the society official web platform across a 3-tier MERN stack. Managed component lifecycles and API integrations.",
  },
  {
    id: "exp-03",
    period: "Dec 2025 – Present",
    organization: "COMSATS Literary Society (CLS)",
    role: "Graphics Lead",
    description:
      "Manage visual assets, UI/UX brand guidelines, and creative branding for university-wide campaigns and digital publications.",
  },
];

export default function ExperienceView() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      colRefs.current.forEach((col, i) => {
        if (!col) return;
        const dot = col.querySelector<HTMLDivElement>(".exp-node-dot");

        gsap.fromTo(
          col,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (dot) {
          gsap.fromTo(
            dot,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: i * 0.15 + 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="exp-bg-grid" aria-hidden="true" />

      <div className="exp-header">
        <div className="exp-badge-num">03</div>
        <h2 className="exp-headline">
          Working // <span className="accent">Experience</span>
        </h2>
        <ExperienceIcon />
      </div>

      <div className="exp-timeline">
        <div className="exp-line-track" aria-hidden="true">
          <div className="exp-line-bg" />
          <div className="exp-line-fill" ref={lineFillRef} />
        </div>

        <div className="exp-columns">
          {ENTRIES.map((entry, i) => (
            <div
              className="exp-col"
              key={entry.id}
              ref={(el) => {colRefs.current[i] = el}}
            >
              <div className="exp-node-dot" aria-hidden="true" />
              <p className="exp-period">{entry.period}</p>
              <p className="exp-org">{entry.organization}</p>
              <p className="exp-role">{entry.role}</p>
              <p className="exp-desc">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceIcon() {
  return (
    <svg
      className="exp-icon"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="expGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="4" y="4" width="72" height="72" rx="12" fill="none" stroke="#1A8CFF" strokeWidth="1.2" opacity="0.4" />
      <g filter="url(#expGlow)" stroke="#00E5FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M44 16 L26 44 H38 L34 64 L56 34 H42 Z" fill="#00E5FF" stroke="none" />
      </g>
      <text x="14" y="70" fontSize="9" fill="#8A94A6" fontFamily="monospace">&gt;_</text>
    </svg>
  );
}