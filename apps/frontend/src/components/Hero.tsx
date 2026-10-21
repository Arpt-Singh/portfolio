import systemDesign from "../assets/system-design.png";
import "./Hero.scss";

const Hero = () => (
  <section className="hero">
    <div className="hero__shade" />
    <div className="hero__intro">
      <div className="hero__copy">
        <div className="hero__text">
          <h1 className="hero__heading">Hi, I’m <span>Arpit</span></h1>
          <p className="hero__description">
            I'm an embedded software engineer. I write firmware for microcontrollers, and I also build the desktop apps
            and Rust services that talk to those devices over CAN, Bluetooth, and gRPC.
          </p>
        </div>
      </div>
      <img
        src={systemDesign}
        alt="Engineering books and a notebook showing an embedded system and gRPC service architecture"
        width={1325}
        height={767}
        className="hero__image"
      />
    </div>
  </section>
);

export default Hero;
