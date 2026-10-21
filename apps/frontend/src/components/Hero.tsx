import { ComputersCanvas } from "./canvas";
import "./Hero.scss";

const Hero = () => (
  <section className="hero">
    <div className="hero__shade" />
    <div className="hero__intro">
      <div className="hero__copy">
        <div className="hero__text">
          <h1 className="hero__heading">Hi, I'm <span>Arpit</span></h1>
          <p className="hero__description">
            Connecting hardware and software through embedded systems, analog &amp; digital electronics, wireless communication, and machine learning.
          </p>
        </div>
      </div>
    </div>
    <div className="hero__scene">
      <ComputersCanvas />
    </div>
  </section>
);

export default Hero;
