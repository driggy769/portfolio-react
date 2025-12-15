import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Temporarily disable smooth scrolling so this feels native (no animation)
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // Restore whatever was there before
    html.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}

export default ScrollToTop;
