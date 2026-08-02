import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEduPointerReveal } from "../../hooks/useEduPointerReveal";
import NetworkGraph from "../hero/NetworkGraph";
import "../../styles/education.css";

gsap.registerPlugin(ScrollTrigger);

interface EducationNode {
  id: string;
  heading: string;
  subheading?: string;
  badge?: string;
  description?: string;
}

const NODES: EducationNode[] = [
  {
    id: "node-01",
    heading: "2023 – 2027 // COMSATS University Islamabad, Wah Campus",
    subheading: "Bachelor of Computer Science (BCS)",
    badge: "Merit Certificate – 1st Position (3rd Semester) | 3.94 / 4.00 SGPA",
  },
  {
    id: "node-02",
    heading: "Core Computer Science Specializations",
    description:
      "Machine Learning, Generative AI (RAG, LLMs), Distributed Backend Systems, and High-Concurrency MERN / Laravel Architectures.",
  },
];

export default function EducationView() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEduPointerReveal(sectionRef, revealLayerRef, canvasRef);

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        const dot = node.querySelector<HTMLSpanElement>(".edu-node-dot");

        gsap.fromTo(
          node,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 82%",
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
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: node,
                start: "top 82%",
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
    <section id="education" className="edu-section" ref={sectionRef}>
      <div className="edu-bg-net" ref={revealLayerRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g opacity={0.5}>
            <line className="grid-line" x1="0" y1="150" x2="1600" y2="150" />
            <line className="grid-line" x1="0" y1="450" x2="1600" y2="450" />
            <line className="grid-line" x1="0" y1="750" x2="1600" y2="750" />
            <line className="grid-line" x1="200" y1="0" x2="200" y2="900" />
            <line className="grid-line" x1="600" y1="0" x2="600" y2="900" />
            <line className="grid-line" x1="1000" y1="0" x2="1000" y2="900" />
            <line className="grid-line" x1="1400" y1="0" x2="1400" y2="900" />
          </g>
          <NetworkGraph />
        </svg>
      </div>
      <canvas className="edu-reveal-canvas" ref={canvasRef} aria-hidden="true" />

      <div className="edu-header">
        <div className="edu-badge-num">02</div>
        <h2 className="edu-headline">
          Education // <span className="edu-accent-cyan">Background</span>
        </h2>
        <EducationGraphic />
      </div>

      <div className="edu-fill-space">
        <br />
        <HUDCube />
        <br />
        <div className="edu-philosophy">
          <br />
          <span className="edu-philosophy-tag">// Academic Philosophy</span>
          
        </div>
      </div>

      <div className="edu-timeline-wrap">
        <svg
          className="edu-timeline-deco"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1A8CFF" strokeWidth="1" opacity="0.4" />
          <circle cx="60" cy="60" r="34" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
          <circle className="edu-graphic-node n1" cx="60" cy="10" r="4" fill="#00E5FF" />
          <circle className="edu-graphic-node n3" cx="103" cy="35" r="3" fill="#1A8CFF" />
          <circle className="edu-graphic-node n5" cx="103" cy="85" r="3" fill="#1A8CFF" />
          <circle className="edu-graphic-node n2" cx="60" cy="110" r="4" fill="#00E5FF" />
          <circle className="edu-graphic-node n4" cx="17" cy="85" r="3" fill="#1A8CFF" />
          <circle className="edu-graphic-node n6" cx="17" cy="35" r="3" fill="#1A8CFF" />
        </svg>

        <div className="edu-timeline">
          <div className="edu-timeline-bar" aria-hidden="true" />
          {NODES.map((node, i) => (
            <div
              className="edu-node"
              key={node.id}
              ref={(el) => (nodeRefs.current[i] = el)}
            >
              <span className="edu-node-dot" aria-hidden="true" />
              <div className="edu-node-content">
                <p className="edu-node-heading">{node.heading}</p>
                {node.subheading && <p className="edu-node-subheading">{node.subheading}</p>}
                {node.badge && <span className="edu-node-badge">{node.badge}</span>}
                {node.description && <p className="edu-node-desc">{node.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationGraphic() {
  return (
    <svg
      className="edu-graphic"
      viewBox="0 0 260 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="eduGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#1A8CFF" strokeWidth="1.4" opacity="0.6">
        <line className="edu-graphic-line" x1="30" y1="100" x2="110" y2="40" />
        <line className="edu-graphic-line" x1="30" y1="100" x2="110" y2="100" />
        <line className="edu-graphic-line" x1="30" y1="100" x2="110" y2="160" />
        <line className="edu-graphic-line" x1="110" y1="40" x2="190" y2="20" />
        <line className="edu-graphic-line" x1="110" y1="40" x2="190" y2="70" />
        <line className="edu-graphic-line" x1="110" y1="100" x2="190" y2="70" />
        <line className="edu-graphic-line" x1="110" y1="100" x2="190" y2="130" />
        <line className="edu-graphic-line" x1="110" y1="160" x2="190" y2="130" />
        <line className="edu-graphic-line" x1="110" y1="160" x2="190" y2="180" />
      </g>
      <g filter="url(#eduGlow)">
        <circle className="edu-graphic-node n1" cx="30" cy="100" r="8" fill="#00E5FF" />
        <circle className="edu-graphic-node n2" cx="110" cy="40" r="5.5" fill="#1A8CFF" />
        <circle className="edu-graphic-node n3" cx="110" cy="100" r="5.5" fill="#1A8CFF" />
        <circle className="edu-graphic-node n4" cx="110" cy="160" r="5.5" fill="#1A8CFF" />
        <circle className="edu-graphic-node n5" cx="190" cy="20" r="4.5" fill="#00E5FF" />
        <circle className="edu-graphic-node n6" cx="190" cy="70" r="4.5" fill="#00E5FF" />
        <circle className="edu-graphic-node n7" cx="190" cy="130" r="4.5" fill="#00E5FF" />
        <circle className="edu-graphic-node n1" cx="190" cy="180" r="4.5" fill="#00E5FF" />
      </g>
    </svg>
  );
}
function HUDCube() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="hud-cube-wrap">
      <span className="hud-cube-label">[SYS_CUBE // ARCH_02]</span>
      <br />
      <div className={`hud-cube-scene${reduceMotion ? " reduced" : ""}`}>
        <div className="hud-cube">
          <div className="cube-face front" />
          <div className="cube-face back" />
          <div className="cube-face right" />
          <div className="cube-face left" />
          <div className="cube-face top" />
          <div className="cube-face bottom" />
        </div>
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
      </div>
    </div>
  );
}