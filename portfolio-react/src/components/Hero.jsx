import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const leftTitleRef = useRef(null);
  const rightTitleRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const leftTitle = leftTitleRef.current;
    const rightTitle = rightTitleRef.current;

    if (!hero) return;

    const CENTER = 0.5;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const EDGE_MARGIN_PX = isMobile ? 140 : 220;

    let pointerX01 = CENTER;
    let reveal = -0.2;
    let velocity = 0;
    let introPlaying = true;

    const FOLLOW = 0.1;
    const SPRING = 0.07;
    const FRICTION = 0.9;

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const clamp01 = (v) => clamp(v, 0, 1);

    requestAnimationFrame(() => {
      hero.classList.add("is-visible");
    });

    if (!isMobile) {
      hero.addEventListener("pointermove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        pointerX01 = clamp01(x);
        introPlaying = false;
      });
    }

    function animate() {
      const rect = hero.getBoundingClientRect();
      const min = EDGE_MARGIN_PX / rect.width;
      const max = 1 - min;

      const target = isMobile ? CENTER : introPlaying ? CENTER : pointerX01;
      const intent = reveal + (target - reveal) * FOLLOW;
      const force = (intent - reveal) * SPRING;

      velocity = velocity * FRICTION + force;
      reveal += velocity;

      const imageReveal = clamp(reveal, min, max);
      hero.style.setProperty("--reveal", `${imageReveal * 100}%`);

      if (!isMobile) {
        if (imageReveal < CENTER) {
          leftTitle.style.opacity = "1";
          rightTitle.style.opacity = "0.35";
        } else {
          leftTitle.style.opacity = "0.35";
          rightTitle.style.opacity = "1";
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div id="hero" className="hero" ref={heroRef}>
      <div className="mobile-image" />

      <div className="layers" aria-hidden="true">
        <div className="color" />
        <div className="layer base" />
        {/* 🔴 RENAMED */}
        <div className="layer reveal-image" />
      </div>

      <h1 className="title left" ref={leftTitleRef}>
        Designer
        <p className="subtitle">
          I am trying to make the internet a little prettier, one project at a
          time.
        </p>
      </h1>

      <h1 className="title right" ref={rightTitleRef}>
        &lt;coder&gt;
        <p className="subtitle">
          Thoughtful code. Beautiful results. Followed by a nice cup of tea.
        </p>
      </h1>
    </div>
  );
}
