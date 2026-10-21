import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import "./About.css";

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
      <h2 className="section-heading">Overview.</h2>
    </header>
    <p className="about__description">
      I build intelligent embedded systems by connecting electronics, physics, low level programming,
      wireless communication, and machine learning.
      My work spans C/C++, Rust, Linux Drivers/Yocto Project, real-time device interactions, signal processing,
      and computer Vision application - with a focus on understanding complex problem statement, translate to user need and turning them into reliable engineering solutions.
    </p>
    <div className="about__grid">
      {services.map((service) => <ServiceCard key={service.title} {...service} />)}
    </div>
  </div>
);

export default SectionWrapper(About, "about");
