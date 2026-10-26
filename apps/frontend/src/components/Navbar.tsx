import { useState } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../constants";
import { logo } from "../assets";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link
          to='/'
          className="navbar__brand"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='Arpit' className="navbar__logo" />
          <span className="navbar__role">Embedded Software Engineer</span>
        </Link>

        <ul className="navbar__desktop-links">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`navbar__item${active === nav.title ? " navbar__item--active" : ""}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__mobile">
          <button
            type='button'
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            aria-controls='mobile-navigation'
            onClick={() => setToggle((open) => !open)}
            className={`navbar__toggle${toggle ? " navbar__toggle--open" : ""}`}
          >
            <span aria-hidden='true' className="navbar__hamburger">
              <span className="navbar__bar" />
              <span className="navbar__bar" />
              <span className="navbar__bar" />
            </span>
          </button>

          <div
            id='mobile-navigation'
            className="navbar__dropdown"
            hidden={!toggle}
          >
            <ul className="navbar__mobile-links">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`navbar__item${active === nav.title ? " navbar__item--active" : ""}`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
