import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import "./Works.scss";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="works__link-icon">
    <path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.3 18.3 4.6 18.3 4.6c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

const GitHubLink = ({ href, name }: { href?: string; name: string }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="works__github" aria-label={`${name} repository on GitHub (opens in a new tab)`}>
    <GitHubIcon />
  </a>
) : (
  <span className="works__github" title="Repository coming soon">
    <GitHubIcon />
  </span>
);

const Works = () => (
  <div className="works">
    <header>
      <p className="section-subheading">Research & Engineering</p>
      <h2 className="section-heading">Projects</h2>
    </header>
    <div className="works__grid">
      {projects.map((project) => (
        <article key={project.name} className="works__card">
          <div className="works__card-header">
            <h3 className="works__card-title">{project.name}</h3>
            {!project.proprietary && <GitHubLink href={project.repoUrl} name={project.name} />}
          </div>
          <p className="works__summary">{project.summary}</p>
          <ul className="works__technologies" aria-label={`${project.name} technologies`}>
            {project.technologies.map((technology) => (
              <li key={technology} className="works__technology">{technology}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>
);

export default SectionWrapper(Works, "projects");
