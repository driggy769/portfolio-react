import { useEffect } from "react";

export default function useReveal(dep) {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

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

    reveals.forEach((el) => {
      if (!el.classList.contains("active")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [dep]);
}
