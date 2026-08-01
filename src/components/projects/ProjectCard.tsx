import type { Project } from "../../data/projects";
import "../../styles/projects.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="proj-card">
      <div className="proj-card-top">
        <span className="proj-card-date">{project.date}</span>
        {project.metric && <span className="proj-card-metric">{project.metric}</span>}
      </div>
      <h3 className="proj-card-title">{project.title}</h3>
      <p className="proj-card-desc">{project.description}</p>
      <div className="proj-card-stack">
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
  );
}