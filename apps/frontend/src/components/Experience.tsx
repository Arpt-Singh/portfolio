import { employer, experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import "./Experience.scss";

const Experience = () => (
  <div className="experience">
    <header>
      <p className="section-subheading">My Engineering Journey</p>
      <h2 className="section-heading">Work Experience</h2>
    </header>
    <a href={employer.url} target="_blank" rel="noopener noreferrer" className="experience__employer"
      aria-label={`${employer.name} (opens in a new tab)`}>
      <span className="experience__employer-logo">
        <img src={employer.logo} alt="" width={40} height={38} loading="lazy" />
      </span>
      <span>{employer.name}</span>
    </a>
    <ol className="experience__timeline">
      {experiences.map((experience) => (
        <li key={experience.date} className="experience__entry">
          <p className="experience__date">{experience.date}</p>
          <div className="experience__content">
            <h3 className="experience__title">{experience.title}</h3>
            {experience.areas.map((area, index) => (
              <section key={`${experience.date}-${index}`} className="experience__area">
                {area.focus && <h4 className="experience__focus">{area.focus}</h4>}
                <ul className="experience__points">
                  {area.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
            ))}
            <ul className="experience__technologies" aria-label={`${experience.title} technologies`}>
              {experience.technologies.map((technology) => (
                <li key={technology} className="experience__technology">{technology}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default SectionWrapper(Experience, "work");
