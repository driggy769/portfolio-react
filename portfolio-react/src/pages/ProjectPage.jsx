import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

import "./ProjectPage.css";

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const [index, setIndex] = useState(0);

  const startX = useRef(0);
  const isDragging = useRef(false);

  if (!project) {
    return (
      <div className="project-page">
        <main className="project-content">
          <section className="project-text">
            <h2>Project not found</h2>
            <p>The project you’re looking for doesn’t exist.</p>
          </section>
        </main>
      </div>
    );
  }

  const total = project.gallery?.length || 0;

  const goNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  /* =========================
     KEYBOARD NAVIGATION
  ========================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  /* =========================
     SWIPE HANDLERS
  ========================= */
  const handleStart = (x) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleEnd = (x) => {
    if (!isDragging.current) return;

    const delta = x - startX.current;
    const threshold = 50;

    if (delta > threshold) goPrev();
    if (delta < -threshold) goNext();

    isDragging.current = false;
  };

  return (
    <div className="project-page">
      {/* HERO */}
      <header className="project-hero">
        <img src={project.heroImage} alt={project.title} />

        <div className="project-hero-overlay">
          <div className="project-hero-inner">
            <h1>{project.title}</h1>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="project-content">
        {/* TEXT */}
        <section className="project-text">
          {Array.isArray(project.content) &&
            project.content.map((block, i) => {
              if (block.type === "heading")
                return <h2 key={i}>{block.text}</h2>;
              if (block.type === "paragraph")
                return <p key={i}>{block.text}</p>;
              return null;
            })}
        </section>

        {/* LIVE DEMO + BACK BUTTONS */}
        {project.liveDemo && (
          <section className="project-live-demo">
            <div className="project-cta-group">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="live-demo-btn"
              >
                View Live Demo
              </a>

              <Link to="/#work" className="live-demo-btn secondary">
                Back to Projects
              </Link>
            </div>
          </section>
        )}

        {/* FADE CAROUSEL */}
        {total > 0 && (
          <section className="project-carousel">
            <h2>Gallery</h2>

            <div className="carousel fade-carousel">
              <button
                className="carousel-btn prev"
                onClick={goPrev}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div
                className="fade-frame"
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseUp={(e) => handleEnd(e.clientX)}
                onMouseLeave={() => (isDragging.current = false)}
              >
                {project.gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    draggable="false"
                    className={`fade-slide ${i === index ? "active" : ""}`}
                  />
                ))}
              </div>

              <button
                className="carousel-btn next"
                onClick={goNext}
                aria-label="Next image"
              >
                ›
              </button>

              {/* COUNTER */}
              <div className="carousel-counter">
                {index + 1} / {total}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default ProjectPage;
