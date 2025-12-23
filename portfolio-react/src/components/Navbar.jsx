import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

/* =========================
   NAV SECTIONS (ID + LABEL)
========================= */
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

/* =========================
   ROUTE → NAV MAP
========================= */
const ROUTE_MAP = [
  { match: /^\/$/, active: null },
  { match: /^\/work\/.+/, active: "work" },
  { match: /^\/blog/, active: "blog" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  /* =========================
     SCROLL HANDLER
  ========================= */
  const scrollToSection = (id) => {
    closeMenu();

    if (isHome) {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { replace: false });

      // wait for home to mount
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  /* =========================
     MOBILE MENU
  ========================= */
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  /* =========================
     ROUTE-BASED ACTIVE STATE
  ========================= */
  useEffect(() => {
    if (isHome) {
      setActive(null);
      return;
    }

    const route = ROUTE_MAP.find((r) => r.match.test(location.pathname));
    setActive(route?.active ?? null);
  }, [isHome, location.pathname]);

  /* =========================
     SCROLL SPY (HOME ONLY)
  ========================= */
  useEffect(() => {
    if (!isHome) return;

    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
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
      <button
        className="logo"
        onClick={() => scrollToSection("hero")}
        aria-label="Go to top"
      >
        <img src="/images/logo.png" className="logo-default" alt="" />
        <img src="/images/logo-hover.png" className="logo-hover" alt="" />
      </button>

      {/* LINKS */}
      <ul className={`nav-links ${open ? "active" : ""}`}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              className={active === id ? "active" : ""}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          </li>
        ))}
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
