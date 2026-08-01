import { Link } from "react-router-dom";
import { PROJECTS, FEATURED_PROJECT_IDS } from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";
import "../../styles/projects.css";

export default function ProjectsView() {
  const featured = FEATURED_PROJECT_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="projects" className="proj-section">
      <div className="proj-header">
        <div className="proj-badge-num">04</div>
        <h2 className="proj-headline">
          System // <span className="accent">Architecture &amp; Projects</span>
        </h2>
      </div>

      <div className="proj-grid">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
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