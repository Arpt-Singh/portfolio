import "./Hero.scss";

const Hero = () => (
  <section className="hero">
    <div className="hero__shade" />
    <div className="hero__intro">
      <div className="hero__copy">
        <div className="hero__text">
          <h1 className="hero__heading">Hi, I’m <span>Arpit</span></h1>
          <p className="hero__description">
            Embedded software engineer building firmware, desktop apps, and Rust services that connect them.
          </p>
        </div>
      </div>
      <img
        src={`${import.meta.env.BASE_URL}desktop_pc/workstation01/Dual-Monitor Embedded Development Workstation.png`}
        alt="Dual-monitor embedded development workstation with code, STM32 documentation, and handwritten notes"
        width={1870}
        height={841}
        className="hero__image"
      />
    </div>
  </section>
);

export default Hero;
