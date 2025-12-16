import { Routes, Route } from "react-router-dom";

import useReveal from "./hooks/useReveal";
import Navbar from "./components/Navbar";
import ScrollToHash from "./components/ScrollToHash";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import ProjectPage from "./pages/ProjectPage";
import Blog from "./components/Blog/Blog";
import BlogPostPage from "./pages/BlogPostPage";

import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
