import { useRef } from "react";
import Splash from "./Splash";
import NetworkGraph from "./NetworkGraph";
import { useSplashIntro } from "../../hooks/useSplashIntro";
import { useHeadlineWords } from "../../hooks/useHeadlineWords";
import { usePointerReveal } from "../../hooks/usePointerReveal";

export default function Hero() {
  const { phase, contentVisible, reduceMotion } = useSplashIntro();
  const headline = useHeadlineWords(contentVisible, reduceMotion);

  const revealLayerRef = useRef<HTMLDivElement>(null);
  const heroFigureRef = useRef<HTMLDivElement>(null);
  const figureRevealRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  usePointerReveal(revealLayerRef, heroFigureRef, figureRevealRef, canvasRef);

  // hero-figure gets its "show" class ~120ms after the rest, matching main.js
  const figureShow = contentVisible;

  return (
    <>
      <Splash phase={phase} />

      <div className="bg-layer base-layer" />
      <div className="bg-layer reveal-layer" ref={revealLayerRef}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g className="grid" opacity={0.5}>
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
      <canvas id="reveal-canvas" ref={canvasRef} />

      <main className="hero">
        <div className={`hero-bg-number${contentVisible ? " show" : ""}`} aria-hidden="true">
          ENGINEER
        </div>

        <div className={`hero-figure${figureShow ? " show" : ""}`} ref={heroFigureRef}>
          <span className="figure-scan" aria-hidden="true" />
          <img
            className="figure-base"
            src="/assets/nightwing.png"
            alt="Nightwing character illustration"
            width={458}
            height={436}
            draggable={false}
          />
          <img
            className="figure-reveal"
            ref={figureRevealRef}
            src="/assets/nightwing-reveal.png"
            alt=""
            width={512}
            height={487}
            draggable={false}
            aria-hidden="true"
          />
        </div>

        <div className={`hero-topline${contentVisible ? " show" : ""}`}>
          <p className="topline-tag"><span className="dot" />Based in Islamabad, Pakistan</p>
          <p className="topline-title">Full-Stack /<br />AI Engineer</p>
        </div>

        <div className={`hero-stats${contentVisible ? " show" : ""}`}>
          <span className="stats-label">Snapshot</span>
          <div className="stat-row"><span className="stat-num">12</span><span className="stat-key">Projects shipped</span></div>
          <div className="stat-row"><span className="stat-num accent">03</span><span className="stat-key">Years building</span></div>
          <div className="stat-row"><span className="stat-num muted">40+</span><span className="stat-key">Tools &amp; frameworks</span></div>
        </div>

        <div className="hero-bottom">
          <div className={`hero-name-block${contentVisible ? " show" : ""}`}>
            <div className="badge-row">
              {["FastAPI", "React", "MLOps", "GenAI"].map((b) => (
                <span className="badge" key={b}>{b}</span>
              ))}
            </div>
            <h1 className="hero-name"> AYAAN <br />AHMED KHAN</h1>
          </div>

          <div className="hero-pitch">
            <h2 className="headline">
              {headline.map((w) => (
                <span className="word" key={w.key}>
                  <span className={`word-inner${w.accent ? " accent-word" : ""}${w.visible ? " show" : ""}`}>
                    {w.text}
                    {"\u00A0"}
                  </span>
                </span>
              ))}
            </h2>
            <p className={`sub${contentVisible ? " show" : ""}`}>
              Undergraduate computer scientist building production-grade backends, ML pipelines, and
              distributed systems — from FastAPI services to autonomous agent architectures.
            </p>
            <div className={`cta-row${contentVisible ? " show" : ""}`}>
              <a className="pill-btn primary" href="#work">
                <span className="pill-fill" />
                <span className="pill-label">
                  <span className="label-base">View Architecture</span>
                  <span className="label-mask"><span>View Architecture</span></span>
                </span>
                <span className="pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#F4F6F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a className="pill-btn secondary" href="#contact">
                <span className="pill-fill" />
                <span className="pill-label">
                  <span className="label-base">Start a Project</span>
                  <span className="label-mask"><span>Start a Project</span></span>
                </span>
                <span className="pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#F4F6F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className={`scroll-hint${contentVisible ? " show" : ""}`}>
          <span className="line" />Scroll
        </div>
      </main>
    </>
  );
}