import { githubProfileUrl } from "../constants";
import { SectionWrapper } from "../hoc";
import "./Contact.scss";

const CONTACT_EMAIL = "contact.arpitsystems@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/arpit-singh-a6ba89240/";

const Contact = () => (
  <div className="contact">
    <div className="contact__panel">
      <div className="contact__intro">
        <p className="section-subheading">Get in touch</p>
        <h3 className="section-heading contact__heading">Let's talk</h3>
        <p className="contact__description">
          Have an engineering problem, a project idea, or a question about my work? I'd like to hear from you.
        </p>
        <div className="contact__details">
          <p className="contact__label">Email me directly</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact__email">{CONTACT_EMAIL}</a>
          <ul className="contact__socials">
            <li>
              <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="contact__social contact__social--github">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="contact__social-icon">
                  <path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.3 18.3 4.6 18.3 4.6c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="contact__social contact__social--linkedin">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="contact__social-icon">
                  <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </li>
          </ul>
          <ul className="contact__topics" aria-label="Areas of interest">
            <li>Embedded Systems Design</li>
            <li>Software System Design</li>
            <li>Applied Research</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SectionWrapper(Contact, "contact");
