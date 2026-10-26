import "./Hero.scss";

const Hero = () => (
  <section className="hero">
    <div className="hero__intro">
      <div className="hero__copy">
        <h1 className="hero__heading">Hello, I’m Arpit</h1>
        <p className="hero__description">
          I build embedded firmware, Rust services, and tauri-based desktop application that connect hardware and software.
        </p>
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
