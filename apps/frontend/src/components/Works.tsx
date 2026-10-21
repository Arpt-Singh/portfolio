import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import "./Works.scss";

const Works = () => (
  <div className="works">
    <header className="works__header">
      <p className="section-subheading">Research & engineering</p>
      <h2 className="section-heading">Projects</h2>
    </header>
    <div className="works__grid">
      {[...projects].reverse().map((project) => (
        <article key={project.name} className="works__card">
          <h3 className="works__card-title">{project.name}</h3>
          <div className="works__summary">
            <p>{project.description}</p>
            <p>{project.solution}</p>
            <p>{project.outcome}</p>
          </div>
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
