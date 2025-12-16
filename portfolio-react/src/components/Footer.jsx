import "./Footer.css";
import logo from "/images/logo.png";
import logoHover from "/images/logo-hover.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* LEFT – LOGO */}
        <div className="footer-left">
          <a href="#hero" className="footer-logo" aria-label="Back to top">
            <img src={logo} className="logo-default" alt="Warren Jay Pearson" />
            <img
              src={logoHover}
              className="logo-hover"
              alt="Warren Jay Pearson"
            />
          </a>
        </div>

        {/* CENTER – COPYRIGHT */}
        <div className="footer-center">© {year} Warren Jay Pearson</div>

        {/* RIGHT – SOCIAL */}
        <div className="footer-right">
          <a href="mailto:warren.pearson89@gmail.com" aria-label="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/warren-jay-pearson-2b217642/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>

          <a
            href="https://github.com/driggy769"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            href="https://instagram.com/warreninpixels"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
