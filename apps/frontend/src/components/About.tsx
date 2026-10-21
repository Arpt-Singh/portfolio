import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import "./About.scss";

const ServiceCard = ({ title, icon, technologies }: (typeof services)[number]) => (
  <article className="about__card">
    <div className="about__card-content">
      <img src={icon} alt="" className="about__icon" />
      <h3 className="about__card-title">{title}</h3>
      <ul className="about__technologies" aria-label={`${title} technologies`}>
        {technologies.map((technology) => (
          <li key={technology} className="about__technology">{technology.trim()}</li>
        ))}
      </ul>
    </div>
  </article>
);

const About = () => (
  <div className="about">
    <header className="about__header">
      <p className="section-subheading">Introduction</p>
      <h2 className="section-heading">Overview</h2>
    </header>
    <p className="about__description">
      I design end-to-end systems spanning embedded firmware, backend services, desktop applications, and test platforms—defining the interfaces and data flows that make hardware and software work reliably together.
    </p>
    <div className="about__grid">
      {services.map((service) => <ServiceCard key={service.title} {...service} />)}
    </div>
  </div>
);

export default SectionWrapper(About, "about");
