import { useEffect, useRef } from "react";
import WorkItem from "./WorkItem";
import { projects } from "../data/projects";
import "./Work.css";

function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reveals = root.querySelectorAll(".reveal");

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

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const commercial = projects.filter(
    (project) => project.category === "commercial"
  );

  const selfDev = projects.filter((project) => project.category === "self");

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-inner">
        <h2 className="reveal">Work</h2>

        <p className="work-intro reveal">
          I spent the last 4 years at my last role, so most of my current
          portfolio centers around that time. Alongside this, I’ve worked on
          personal projects to experiment and keep my skills sharp.
        </p>

        {/* COMMERCIAL */}
        <div className="work-group reveal">
          <h3 className="work-title">Commercial Work</h3>

          <div className="work-grid">
            {commercial.map((project) => (
              <WorkItem key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* SELF DEVELOPMENT */}
        <div className="work-group reveal">
          <h3 className="work-title">Self-Development</h3>

          <div className="work-grid">
            {selfDev.map((project) => (
              <WorkItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
