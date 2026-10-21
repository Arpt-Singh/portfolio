import { SectionWrapper } from "../hoc";
import "./Contact.css";

const CONTACT_EMAIL = "arpit181001002080@gmail.com";

const Contact = () => (
  <div className="contact">
    <div className="contact__panel">
      <div className="contact__intro">
        <p className="section-subheading">Get in touch</p>
        <h3 className="section-heading contact__heading">Let's talk.</h3>
        <p className="contact__description">
          Have an engineering problem, a project idea, or a question about my work? I'd like to hear from you.
        </p>
        <div className="contact__details">
          <p className="contact__label">Email me directly</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact__email">{CONTACT_EMAIL}</a>
          <p className="contact__topics">Embedded systems / Software / Applied research</p>
        </div>
      </div>
    </div>
  </div>
);

export default SectionWrapper(Contact, "contact");
