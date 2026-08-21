import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useNeuralMask } from "../hooks/useNeuralMask";
import NetworkGraph from "../components/hero/NetworkGraph";
import "../styles/projects.css";
import "../styles/allprojects.css";

gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | "ai" | "fullstack";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "fullstack", label: "Full-Stack & Mobile" },
];

function parseFilter(value: string | null): Filter {
  if (value === "ai" || value === "fullstack") return value;
  return "all";
}

export default function AllProjects() {
  const reduceMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<Filter>(() => parseFilter(searchParams.get("filter")));
  const [query, setQuery] = useState("");
  const showcaseRef = useRef<HTMLDivElement>(null!);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRef = useRef<HTMLDivElement>(null!);

  useNeuralMask(maskRef);
  useEffect(() => {
    setFilter(parseFilter(searchParams.get("filter")));
  }, [searchParams]);

  function handleFilterClick(next: Filter) {
    setFilter(next);
    if (next === "all") {
      const params = new URLSearchParams(searchParams);
      params.delete("filter");
      setSearchParams(params, { replace: true });
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("filter", next);
      setSearchParams(params, { replace: true });
    }
  }

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  rowRefs.current = [];

  useEffect(() => {
    if (reduceMotion || !showcaseRef.current) return;
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, showcaseRef);
    return () => ctx.revert();
  }, [filtered, reduceMotion]);

  const aiCount = PROJECTS.filter((p) => p.category === "ai").length;
  const fsCount = PROJECTS.filter((p) => p.category === "fullstack").length;

  return (
    <div className="allproj-page">
      <div className="allproj-neural-bg" ref={maskRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <NetworkGraph />
        </svg>
      </div>

      <Link className="allproj-back" to="/">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7L7 17M7 17H16M7 17V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <div className="allproj-hero">
        <div className="cyber-grid-accent" aria-hidden="true" />
        <div className="allproj-hero-left">
          <span className="allproj-eyebrow">Full Archive</span>
          <h1 className="allproj-title">
            All <span className="accent">Systems</span>
          </h1>
          <p className="allproj-subtitle">
            {PROJECTS.length} shipped projects across AI/ML engineering and full-stack development —
            filter, search, or browse the complete archive below.
          </p>
        </div>
        <div className="allproj-stats">
          <div className="allproj-stat">
            <span className="allproj-stat-num">{PROJECTS.length}</span>
            <span className="allproj-stat-key">Total Projects</span>
          </div>
          <div className="allproj-stat">
            <span className="allproj-stat-num accent">{aiCount}</span>
            <span className="allproj-stat-key">AI / ML</span>
          </div>
          <div className="allproj-stat">
            <span className="allproj-stat-num">{fsCount}</span>
            <span className="allproj-stat-key">Full-Stack</span>
          </div>
        </div>
      </div>

      <div className="allproj-controls">
        <div className="allproj-filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`allproj-filter${filter === f.id ? " active" : ""}`}
              onClick={() => handleFilterClick(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="allproj-search">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="allproj-search-icon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or tech…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="allproj-showcase" ref={showcaseRef}>
        {filtered.map((project, i) => (
          <div
            className={`allproj-row${i % 2 !== 0 ? " reverse" : ""}`}
            id={project.id}
            key={project.id}
            ref={(el) => {rowRefs.current[i] = el}}
          >
            <div className="allproj-row-text">
              <span className="allproj-row-index">
                {String(i + 1).padStart(2, "0")} <span className="accent">//</span>
              </span>
              {project.metric && <span className="allproj-row-metric">{project.metric}</span>}
              <h3 className="allproj-row-title">{project.title}</h3>
              <p className="allproj-row-date">{project.date}</p>
              <div className="allproj-row-stack">
                {project.tech.map((t) => (
                  <span className="proj-pill" key={t}>{t}</span>
                ))}
              </div>
              <p className="allproj-row-desc">{project.description}</p>
              <a className="proj-btn proj-btn-primary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View GitHub Repository
                <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="allproj-row-cluster">
              {project.images && project.images.length > 0 ? (
                <ProjectGallery project={project} />
              ) : (
                <>
                  <div className="cluster-orbit" aria-hidden="true" />
                  {project.category === "ai" ? (
                    <AIClusterMockup project={project} />
                  ) : (
                    <FullstackClusterMockup project={project} />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="allproj-empty">
          <p>No projects match “{query}”.</p>
          <button
            className="allproj-reset"
            onClick={() => {
              setQuery("");
              handleFilterClick("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="gallery-wrap">
      <div className="gallery-frame">
        <img
          key={images[active]}
          src={images[active]}
          alt={`${project.title} preview ${active + 1} of ${images.length}`}
          className="gallery-img"
        />

        {images.length > 1 && (
          <>
            <button className="gallery-nav prev" onClick={prev} aria-label="Previous image">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="gallery-nav next" onClick={next} aria-label="Next image">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery-dots" role="tablist" aria-label={`${project.title} image selector`}>
          {images.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === active}
              aria-label={`Show image ${idx + 1}`}
              className={`gallery-dot${idx === active ? " active" : ""}`}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AIClusterMockup({ project }: { project: Project }) {
  const bars = [72, 91, 58, 84, 67];
  return (
    <div className="cluster-wrap">
      <div className="cluster-card cluster-card-back">
        <div className="cluster-card-header">
          <span className="cluster-dot red" />
          <span className="cluster-dot yellow" />
          <span className="cluster-dot green" />
          <span className="cluster-card-label">vector_store.embed</span>
        </div>
        <div className="cluster-node-graph">
          <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#1A8CFF" strokeWidth="1" opacity="0.5">
              <line x1="20" y1="60" x2="90" y2="20" />
              <line x1="20" y1="60" x2="90" y2="60" />
              <line x1="20" y1="60" x2="90" y2="100" />
              <line x1="90" y1="20" x2="160" y2="45" />
              <line x1="90" y1="60" x2="160" y2="45" />
              <line x1="90" y1="60" x2="160" y2="85" />
              <line x1="90" y1="100" x2="160" y2="85" />
            </g>
            <circle cx="20" cy="60" r="6" fill="#00E5FF" />
            <circle cx="90" cy="20" r="4" fill="#1A8CFF" />
            <circle cx="90" cy="60" r="4" fill="#1A8CFF" />
            <circle cx="90" cy="100" r="4" fill="#1A8CFF" />
            <circle cx="160" cy="45" r="4.5" fill="#00E5FF" />
            <circle cx="160" cy="85" r="4.5" fill="#00E5FF" />
          </svg>
        </div>
      </div>

      <div className="cluster-card cluster-card-front">
        <div className="cluster-card-header">
          <span className="cluster-card-label mono">{project.id}.metrics</span>
        </div>
        <div className="cluster-metrics">
          {bars.map((v, i) => (
            <div className="cluster-metric-row" key={i}>
              <span className="cluster-metric-tag">feat_{i + 1}</span>
              <div className="cluster-metric-track">
                <div className="cluster-metric-fill" style={{ width: `${v}%` }} />
              </div>
              <span className="cluster-metric-val">{v}%</span>
            </div>
          ))}
        </div>
        {project.metric && (
          <div className="cluster-badge-row">
            <span className="cluster-result-badge">{project.metric}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FullstackClusterMockup({ project }: { project: Project }) {
  return (
    <div className="cluster-wrap">
      <div className="cluster-card cluster-card-back">
        <div className="cluster-card-header">
          <span className="cluster-dot red" />
          <span className="cluster-dot yellow" />
          <span className="cluster-dot green" />
          <span className="cluster-card-label mono">bash — ayaan@nightwing-os:~</span>
        </div>
        <div className="cluster-terminal">
          <p><span className="term-prompt">$</span> deploy --target={project.id}</p>
          <p className="term-line">→ compiling build artifacts…</p>
          <p className="term-line">→ running migrations… <span className="term-ok">OK</span></p>
          <p className="term-line">→ status: <span className="term-ok">200 healthy</span></p>
        </div>
      </div>

      <div className="cluster-card cluster-card-front">
        <div className="cluster-card-header">
          <span className="cluster-card-label">REST Endpoints</span>
        </div>
        <div className="cluster-endpoints">
          <div className="cluster-endpoint">
            <span className="endpoint-method get">GET</span>
            <span className="endpoint-path">/api/v1/{project.id}</span>
          </div>
          <div className="cluster-endpoint">
            <span className="endpoint-method post">POST</span>
            <span className="endpoint-path">/api/v1/{project.id}/sync</span>
          </div>
          <div className="cluster-endpoint">
            <span className="endpoint-method get">GET</span>
            <span className="endpoint-path">/api/v1/{project.id}/status</span>
          </div>
        </div>
        {project.metric && (
          <div className="cluster-badge-row">
            <span className="cluster-result-badge">{project.metric}</span>
          </div>
        )}
      </div>
    </div>
  );
}