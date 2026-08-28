import { useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, FEATURED_PROJECT_IDS } from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";
import { useLocalNeuralMask } from "../../hooks/useLocalNeuralMask";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import NetworkGraph from "../hero/NetworkGraph";
import "../../styles/projects.css";

export default function ProjectsView() {
 const maskRef = useRef<HTMLDivElement>(null!);
  useLocalNeuralMask(maskRef);
  const reduceMotion = useReducedMotion();

  const featured = FEATURED_PROJECT_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Duplicate the list so the marquee can loop seamlessly (translateX -50%
  // lands exactly back on the first copy). Skip duplication when reduced
  // motion is requested, since the track becomes a static, manually
  // scrollable row instead of an animated one.
  const trackProjects = reduceMotion ? featured : [...featured, ...featured];

  return (
    <section id="projects" className="proj-section">
      <div className="proj-bg-net" ref={maskRef} aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <NetworkGraph />
        </svg>
      </div>

      <div className="proj-header">
        <div className="proj-badge-num">04</div>
        <h2 className="proj-headline">
          System // <span className="accent">Architecture &amp; Projects</span>
        </h2>
      </div>

      <div className="proj-grid">
        <div className="proj-track">
          {trackProjects.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} />
          ))}
        </div>
      </div>

      <div className="proj-footer">
        <Link className="proj-viewall" to="/projects">
          View All Projects
          <svg className="proj-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}