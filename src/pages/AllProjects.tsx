import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "../styles/projects.css";

gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | "ai" | "fullstack";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "fullstack", label: "Full-Stack & Mobile" },
];

export default function AllProjects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (reduceMotion || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".allproj-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [filtered, reduceMotion]);

  const aiCount = PROJECTS.filter((p) => p.category === "ai").length;
  const fsCount = PROJECTS.filter((p) => p.category === "fullstack").length;

  return (
    <div className="allproj-page">
      <div className="allproj-bg-grid" aria-hidden="true" />

      <Link className="allproj-back" to="/">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7L7 17M7 17H16M7 17V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <div className="allproj-hero">
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
              onClick={() => setFilter(f.id)}
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

      <div className="allproj-grid" ref={gridRef}>
        {filtered.map((project, i) => (
          <ProjectListCard key={project.id} project={project} index={i + 1} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="allproj-empty">
          <p>No projects match “{query}”.</p>
          <button
            className="allproj-reset"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectListCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="allproj-card">
      <span className="allproj-card-index">{String(index).padStart(2, "0")}</span>
      <div className="allproj-card-body">
        <div className="allproj-card-top">
          <span className="allproj-card-date">{project.date}</span>
          {project.metric && <span className="allproj-card-metric">{project.metric}</span>}
        </div>
        <h3 className="allproj-card-title">{project.title}</h3>
        <p className="allproj-card-desc">{project.description}</p>
        <div className="allproj-card-stack">
          {project.tech.map((t) => (
            <span className="proj-pill" key={t}>{t}</span>
          ))}
        </div>
        <a className="proj-btn proj-btn-primary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          View GitHub Repository
          <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}