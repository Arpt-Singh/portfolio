import { employer, experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import "./Experience.scss";

const ExperienceCard = ({ experience }: { experience: (typeof experiences)[number] }) => (
  <li className="experience__entry">
    <article className="experience__card">
      <h3 className="experience__title">{experience.title}</h3>
      <p className="experience__focus">{experience.focus}</p>
      <div className="experience__summary">
        {experience.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="experience__employer">
        <a href={employer.url} target="_blank" rel="noopener noreferrer"
          aria-label={`Visit ${employer.name} (opens in a new tab)`}>
          <img src={employer.logo} alt="Medtronic" width={40} height={38} loading="lazy" />
        </a>
      </div>
    </article>
    <p className="experience__date">{experience.date}</p>
  </li>
);

const Experience = () => (
  <div className="experience">
    <header className="experience__header">
      <p className="section-subheading">My engineering journey</p>
      <h2 className="section-heading">Work Experience</h2>
    </header>
    <ol className="experience__timeline">
      {experiences.map((experience, index) => <ExperienceCard key={`experience-${index}`} experience={experience} />)}
    </ol>
  </div>
);

export default SectionWrapper(Experience, "work");
