import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "../../styles/services.css";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  tech: string[];
  proofTag: string;
  proofName: string;
  projectId: string;
  icon: JSX.Element;
}

const SERVICES: Service[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning Solutions",
    description:
      "Integrating intelligent features into applications — custom AI assistants, automated data pipelines, and predictive models built to solve real business problems.",
    tech: [
      "Python",
      "TensorFlow",
      "scikit-learn",
      "Gemini API",
      "RAG Pipelines",
    ],
    proofTag: "Featured Project",
    proofName: "Prof GPT — Academic Navigator",
    projectId: "prof-gpt",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="#00E5FF" strokeWidth="1.6" />
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
          stroke="#1A8CFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web application development — from scalable database architectures to pixel-perfect, responsive interfaces, built as robust platforms from the ground up.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Laravel", "REST APIs"],
    proofTag: "Featured Project",
    proofName: "BroBroke — Peer Debt Tracker",
    projectId: "brobroke",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="3"
          y="4"
          width="18"
          height="13"
          rx="2"
          stroke="#00E5FF"
          strokeWidth="1.6"
        />
        <path
          d="M8 21h8M12 17v4"
          stroke="#1A8CFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7 9l2 2-2 2M13 13h4"
          stroke="#00E5FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "mobile-desktop",
    title: "Mobile & Desktop Engineering",
    description:
      "Cross-platform mobile applications and secure, high-performance desktop utilities, tailored to specific operational needs and built for reliability.",
    tech: ["Flutter", "Dart", "C++", "Java", "Python (Tkinter/PyQt5)"],
    proofTag: "Featured Project",
    proofName: "FYP Hub — Project Management App",
    projectId: "fyp-hub",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          stroke="#00E5FF"
          strokeWidth="1.6"
        />
        <path
          d="M10 19h4"
          stroke="#1A8CFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "uiux",
    title: "UI/UX & Brand Design",
    description:
      "Creating intuitive user experiences and striking visual identities — translating abstract concepts into polished prototypes and cohesive branding assets.",
    tech: ["Figma", "Adobe Creative Suite", "Tailwind CSS"],
    proofTag: "Featured Project",
    proofName: "ACM Society Portal Design",
    projectId: "acm-website",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3a9 9 0 100 18 4.5 4.5 0 010-9h4.5a2.5 2.5 0 000-5 9 9 0 00-4.5-4z"
          stroke="#00E5FF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="10.5" r="1" fill="#1A8CFF" />
        <circle cx="9" cy="15" r="1" fill="#00E5FF" />
      </svg>
    ),
  },
];

export default function ServicesView() {
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
          { opacity: 0, y: 24 },
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
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-header">
        <div className="services-badge-num">06</div>
        <h2 className="services-headline">
          Services // <span className="accent">What I Build</span>
        </h2>
        <p className="services-subtext">
          I partner with founders and teams to ship production-grade software —
          from intelligent AI features to full-stack platforms, native apps, and
          the design that ties it together.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <div
            className="service-card"
            key={service.id}
            ref={(el) => {cardRefs.current[i] = el}}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>

            <div className="service-stack">
              {service.tech.map((t) => (
                <span className="service-pill" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <Link
              className="service-proof"
              to={`/projects#${service.projectId}`}
            >
              <span className="service-proof-label">
                <span className="service-proof-tag">{service.proofTag}</span>
                <span className="service-proof-name">{service.proofName}</span>
              </span>
              <svg
                className="service-proof-icon"
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

            <Link className="service-cta" to="/contact">
              Let's Talk
              <svg
                className="service-cta-icon"
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
        ))}
      </div>
    </section>
  );
}
