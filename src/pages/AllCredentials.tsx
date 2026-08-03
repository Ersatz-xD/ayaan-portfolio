import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREDENTIALS, CATEGORY_LABELS, type Credential } from "../data/credentials";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useNeuralMask } from "../hooks/useNeuralMask";
import NetworkGraph from "../components/hero/NetworkGraph";
import "../styles/credentials.css";

gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | Credential["category"];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: `All (${CREDENTIALS.length})` },
  { id: "honors", label: CATEGORY_LABELS.honors },
  { id: "ai", label: CATEGORY_LABELS.ai },
  { id: "fullstack", label: CATEGORY_LABELS.fullstack },
  { id: "devops", label: CATEGORY_LABELS.devops },
];

export default function AllCredentials() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null!);
  const maskRef = useRef<HTMLDivElement>(null!);

  useNeuralMask(maskRef);

  const filtered = useMemo(() => {
    return CREDENTIALS.filter((c) => {
      const matchesFilter = filter === "all" || c.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  useEffect(() => {
    if (reduceMotion || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".cred-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [filtered, reduceMotion]);

  return (
    <div className="allcred-page">
      <div className="allcred-neural-bg" ref={maskRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <NetworkGraph />
        </svg>
      </div>

      <Link className="allcred-back" to="/">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7L7 17M7 17H16M7 17V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <h1 className="allcred-title">
        All // <span className="accent">Credentials &amp; Honors</span>
      </h1>

      <div className="allcred-controls">
        <div className="allcred-filters" role="tablist" aria-label="Filter credentials">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`allcred-filter${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="allcred-search">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="allcred-search-icon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, issuer, or tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search credentials"
          />
        </div>
      </div>

      <div className="allcred-grid" ref={gridRef}>
        {filtered.map((item, i) => (
          <CredentialCard key={item.id} item={item} index={i + 1} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="allcred-empty">
          <p>No credentials match “{query}”.</p>
          <button
            className="allcred-reset"
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

function CredentialCard({ item, index }: { item: Credential; index: number }) {
  return (
    <div className="cred-card">
      <div className="cred-card-viewport">
        {item.image ? (
          <img src={item.image} alt={item.title} className="cred-card-img" />
        ) : (
          <CredentialBadgePlaceholder />
        )}
      </div>
      <div className="cred-card-body">
        <div className="cred-card-top">
          <span className="cred-card-index">{String(index).padStart(2, "0")}</span>
          <span className="cred-card-date">{item.date}</span>
        </div>
        <p className="cred-card-title">{item.title}</p>
        <p className="cred-card-issuer">{item.issuer}</p>
        <div className="cred-card-tags">
          {item.tags.map((t) => (
            <span className="cred-tag" key={t}>{t}</span>
          ))}
        </div>
        {item.verifyUrl && (
          <a className="cred-verify" href={item.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verify Credential
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

function CredentialBadgePlaceholder() {
  return (
    <svg viewBox="0 0 200 200" className="cred-placeholder-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#00E5FF" strokeWidth="1.2" opacity="0.5" />
      <path d="M100 55 L116 86 L152 92 L126 116 L133 152 L100 134 L67 152 L74 116 L48 92 L84 86 Z" fill="none" stroke="#1A8CFF" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}