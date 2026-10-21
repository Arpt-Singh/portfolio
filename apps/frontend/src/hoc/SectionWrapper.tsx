import type { ComponentType } from "react";
import "./SectionWrapper.css";

const SectionWrapper = (Component: ComponentType, idName: string) =>
  function WrappedSection() {
    return (
      <section className="section-wrapper">
        <span className="section-wrapper__anchor" id={idName}>&nbsp;</span>
        <Component />
      </section>
    );
  };

export default SectionWrapper;
