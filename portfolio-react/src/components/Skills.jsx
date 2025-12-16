import { useEffect, useRef } from "react";
import "./Skills.css";

function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    /* =========================
       REVEAL OBSERVER
    ========================= */
    const reveals = root.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
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

    reveals.forEach((el) => revealObserver.observe(el));

    /* =========================
       SKILL BAR OBSERVER
    ========================= */
    const skills = root.querySelectorAll(".skill");

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const skill = entry.target;
          const level = skill.dataset.level;
          const fill = skill.querySelector(".skill-fill");

          if (!fill) return;

          if (entry.isIntersecting) {
            fill.style.width = `${level}%`;
          } else {
            fill.style.width = "0%";
          }
        });
      },
      { threshold: 0.4 }
    );

    skills.forEach((skill) => skillObserver.observe(skill));

    return () => {
      revealObserver.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-inner">
        <h2 className="reveal">Skills</h2>

        {/* DEVELOPMENT */}
        <div className="skills-group skills-dev reveal">
          <h3 className="skills-title">Development</h3>

          <div className="skill" data-level="90">
            <span className="skill-name">HTML</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">90%</span>
          </div>

          <div className="skill" data-level="85">
            <span className="skill-name">CSS</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">85%</span>
          </div>

          <div className="skill" data-level="70">
            <span className="skill-name">JavaScript</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">70%</span>
          </div>

          <div className="skill" data-level="50">
            <span className="skill-name">WordPress</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">50%</span>
          </div>

          <div className="skill" data-level="40">
            <span className="skill-name">React</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">40%</span>
          </div>
        </div>

        {/* DESIGN */}
        <div className="skills-group skills-design reveal">
          <h3 className="skills-title">Design</h3>

          <div className="skill" data-level="90">
            <span className="skill-name">Photoshop</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">90%</span>
          </div>

          <div className="skill" data-level="85">
            <span className="skill-name">Illustrator</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">85%</span>
          </div>

          <div className="skill" data-level="80">
            <span className="skill-name">InDesign</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">80%</span>
          </div>

          <div className="skill" data-level="75">
            <span className="skill-name">Davinci Resolve</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">75%</span>
          </div>

          <div className="skill" data-level="50">
            <span className="skill-name">Figma</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">50%</span>
          </div>
        </div>

        {/* FUN */}
        <div className="skills-group skills-fun reveal">
          <h3 className="skills-title">Fun</h3>

          <div className="skill" data-level="100">
            <span className="skill-name">Spending time with my dog</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">100%</span>
          </div>

          <div className="skill" data-level="90">
            <span className="skill-name">Drawing</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">90%</span>
          </div>

          <div className="skill" data-level="80">
            <span className="skill-name">Video Games</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">80%</span>
          </div>

          <div className="skill" data-level="80">
            <span className="skill-name">Playing Guitar</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">80%</span>
          </div>

          <div className="skill" data-level="75">
            <span className="skill-name">Cooking</span>
            <div className="skill-bar">
              <div className="skill-fill"></div>
            </div>
            <span className="skill-percent">75%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
