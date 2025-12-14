function Navbar() {
  return (
    <nav className="navbar">
      <a href="#hero" className="logo">
        <img src="/images/logo.png" className="logo-default" alt="" />
        <img src="/images/logo-hover.png" className="logo-hover" alt="" />
      </a>

      <ul className="nav-links" id="navLinks">
        <li>
          <a href="#hero">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#videos">Videos</a>
        </li>
        <li>
          <a href="#art">Art</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
