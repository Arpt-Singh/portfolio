import galileo from "../assets/galileo.jpg";
import { SectionWrapper } from "../hoc";
import "./Feedbacks.scss";

const Feedbacks = () => (
  <div className="feedbacks">
    <figure className="feedbacks__figure">
      <span className="feedbacks__mark" aria-hidden='true'>&ldquo;</span>
      <blockquote className="feedbacks__quote">
        [The universe] cannot be read until we have learnt the language and become familiar with the characters in which it is written. It is written in mathematical language
      </blockquote>
      <figcaption className="feedbacks__caption">
        <img
          src={galileo}
          alt='Portrait of Galileo Galilei'
          loading='lazy'
          width={64}
          height={64}
          className="feedbacks__portrait"
        />
        <span>Galileo Galilei</span>
      </figcaption>
    </figure>

  </div>
);

export default SectionWrapper(Feedbacks, "");
