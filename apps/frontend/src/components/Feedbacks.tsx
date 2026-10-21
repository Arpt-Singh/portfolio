import React from "react";
import { SectionWrapper } from "../hoc";
import "./Feedbacks.css";

const Feedbacks = () => (
  <div className="feedbacks">
    <figure className="feedbacks__figure">
      <span className="feedbacks__mark" aria-hidden='true'>&ldquo;</span>
      <blockquote className="feedbacks__quote">
        [The universe] cannot be read until we have learnt the language and become familiar with the characters in which it is written. It is written in mathematical language
      </blockquote>
      <figcaption className="feedbacks__caption">
        <img
          src='https://commons.wikimedia.org/wiki/Special:FilePath/Galileo_Galilei_2.jpg?width=160'
          alt='Portrait of Galileo Galilei'
          loading='lazy'
          width={64}
          height={64}
          className="feedbacks__portrait"
        />
        <span>
          Galileo Galilei
          <span className="feedbacks__attribution">Attributed quotation</span>
        </span>
      </figcaption>
    </figure>

  </div>
);

export default SectionWrapper(Feedbacks, "");
