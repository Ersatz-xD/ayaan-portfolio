import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useNeuralMask } from "../hooks/useNeuralMask";
import NetworkGraph from "../components/hero/NetworkGraph";
import { SERVICE_CATEGORIES } from "../data/services";
import "../styles/services-page.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const reduceMotion = useReducedMotion();
  const maskRef = useRef<HTMLDivElement>(null!);
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useNeuralMask(maskRef);

  useEffect(() => {
    if (reduceMotion || !pageRef.current) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: (i % 4) * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  let cardIndex = 0;

  return (
    <div className="svc-page" ref={pageRef}>
      <div className="svc-neural-bg" ref={maskRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <NetworkGraph />
        </svg>
      </div>

      <Link className="svc-back" to="/">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7L7 17M7 17H16M7 17V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <div className="svc-hero">
        <span className="svc-eyebrow">Full Service Catalog</span>
        <h1 className="svc-title">
          Services // <span className="accent">What I Build</span>
        </h1>
        <p className="svc-subtitle">
          {SERVICE_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)} specific services across{" "}
          {SERVICE_CATEGORIES.length} disciplines — pick what fits, or reach out to scope something custom.
        </p>
      </div>

      {SERVICE_CATEGORIES.map((category) => (
        <div className="svc-category" key={category.id}>
          <div className="svc-category-header">
            <h2 className="svc-category-title">{category.title}</h2>
            <Link
              className="svc-category-link"
              to={`/projects?filter=${category.projectsFilter}`}
            >
              See Related Projects
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="svc-grid">
            {category.items.map((item) => {
              const idx = cardIndex++;
              return (
                <div
                  className="svc-card"
                  key={item.id}
                  ref={(el) => {cardRefs.current[idx] = el}}
                >
                  <h3 className="svc-card-title">{item.title}</h3>
                  <p className="svc-card-desc">{item.description}</p>

                  <div className="svc-card-stack">
                    {item.tech.map((t) => (
                      <span className="svc-pill" key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="svc-card-actions">
                    <Link
                      className="svc-card-link"
                      to={`/projects?filter=${category.projectsFilter}`}
                    >
                      See Related Projects
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <Link className="svc-card-hire" to="/contact">
                      Hire Me
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}