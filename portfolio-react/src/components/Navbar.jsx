import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#hero" className="logo" onClick={closeMenu}>
        <img src="/images/logo.png" className="logo-default" alt="" />
        <img src="/images/logo-hover.png" className="logo-hover" alt="" />
      </a>

      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li>
          <a href="#hero" onClick={closeMenu}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
        </li>
        <li>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
        </li>
        <li>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </li>
      </ul>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
