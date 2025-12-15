import { useEffect, useRef } from "react";
import "./About.css";

function useReveal(ref) {
  useEffect(() => {
    const elements = ref.current?.querySelectorAll(".reveal");
    if (!elements || !elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}

function About() {
  const sectionRef = useRef(null);

  useReveal(sectionRef);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-shapes">
        <span className="shape s1"></span>
        <span className="shape s2"></span>
        <span className="shape s3"></span>
      </div>

      <div className="about-inner">
        <h2 className="reveal">About Me</h2>

        <p className="reveal" style={{ "--delay": "0.1s" }}>
          I’ve been creative for as long as I can remember. As soon as I could
          hold a pencil, I was drawing — filling sketchbooks with cartoons and
          dreaming of becoming an animator. That early love for visuals slowly
          evolved into a fascination with design.
        </p>

        <p className="reveal" style={{ "--delay": "0.1s" }}>
          At 16, I landed my first design internship. It was there that a senior
          designer gave me a piece of advice that would quietly shape my entire
          career: “You should have a website portfolio, not just a physical
          one.”
        </p>

        <p className="reveal" style={{ "--delay": "0.1s" }}>
          That decision changed everything. The website not only showcased my
          design work, but it also opened the door to my first junior web
          designer role.
        </p>

        <p className="reveal" style={{ "--delay": "0.1s" }}>
          Over the years, I’ve been fortunate to work with some incredible
          brands, including Santander, AVIVA, NVIDIA, AMD, Microsoft, Chivas
          Regal, and Harrods.
        </p>

        <p className="reveal" style={{ "--delay": "0.1s" }}>
          Today, I’m a web developer who continues to learn, experiment, and
          refine my craft — combining strong technical skills with a deep
          passion for design.
        </p>

        <h3 className="clients-heading reveal" style={{ "--delay": "0.6s" }}>
          Previous Clients
        </h3>

        <div className="clients-grid">
          <div
            className="client reveal height-adj"
            style={{ "--delay": "0.7s" }}
          >
            <img
              src="/images/logos/nvidia.svg"
              className="clientLogo"
              alt="NVIDIA logo"
            />
          </div>
          <div
            className="client reveal height-adj"
            style={{ "--delay": "0.8s" }}
          >
            <img
              src="/images/logos/amd.svg"
              className="clientLogo"
              alt="AMD logo"
            />
          </div>
          <div
            className="client reveal height-adj"
            style={{ "--delay": "0.9s" }}
          >
            <img
              src="/images/logos/microsoft.svg"
              className="clientLogo"
              alt="Microsoft logo"
            />
          </div>
          <div className="client reveal" style={{ "--delay": "1s" }}>
            <img
              src="/images/logos/chivas-regal.svg"
              className="clientLogo"
              alt="Chivas Regal logo"
            />
          </div>
          <div className="client reveal" style={{ "--delay": "1.1s" }}>
            <img
              src="/images/logos/harrods.svg"
              className="clientLogo"
              alt="Harrods logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
