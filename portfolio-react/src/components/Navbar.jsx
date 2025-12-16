import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

/* =========================
   NAV SECTIONS
========================= */
const SECTIONS = ["hero", "about", "skills", "work", "blog", "contact"];

/* =========================
   ROUTE → NAV MAP
   (extend this later safely)
========================= */
const ROUTE_MAP = [
  { match: /^\/$/, active: null }, // Home (scroll-spy handles this)
  { match: /^\/work\/.+/, active: "work" }, // Project pages
  { match: /^\/blog/, active: "blog" }, // Future example
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  /* =========================
     MOBILE MENU
  ========================= */
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  /* =========================
     ROUTE-BASED ACTIVE STATE
     (FUTURE-PROOF)
  ========================= */
  useEffect(() => {
    if (isHome) return;

    const route = ROUTE_MAP.find((r) => r.match.test(location.pathname));
    setActive(route?.active ?? null);
  }, [isHome, location.pathname]);

  /* =========================
     SCROLL SPY (HOME ONLY)
  ========================= */
  useEffect(() => {
    if (!isHome) return;

    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <a href={navHref("hero")} className="logo" onClick={closeMenu}>
        <img src="/images/logo.png" className="logo-default" alt="" />
        <img src="/images/logo-hover.png" className="logo-hover" alt="" />
      </a>

      {/* LINKS */}
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li>
          <a
            href={navHref("hero")}
            className={active === "hero" ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href={navHref("about")}
            className={active === "about" ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </a>
        </li>

        <li>
          <a
            href={navHref("skills")}
            className={active === "skills" ? "active" : ""}
            onClick={closeMenu}
          >
            Skills
          </a>
        </li>

        <li>
          <a
            href={navHref("work")}
            className={active === "work" ? "active" : ""}
            onClick={closeMenu}
          >
            Work
          </a>
        </li>

        <li>
          <a
            href={navHref("blog")}
            className={active === "blog" ? "active" : ""}
            onClick={closeMenu}
          >
            Blog
          </a>
        </li>

        <li>
          <a
            href={navHref("contact")}
            className={active === "contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </a>
        </li>
      </ul>

      {/* HAMBURGER */}
      <button
        type="button"
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
