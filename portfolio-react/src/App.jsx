import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div id="hero" className="hero">
        <div className="mobile-image"></div>

        <div className="layers" aria-hidden="true">
          <div className="color"></div>
          <div className="layer base"></div>
          <div className="layer reveal"></div>
        </div>

        <h1 className="title left">
          Designer
          <p className="subtitle">
            I am trying to make the internet a little prettier, one project at a
            time.
          </p>
        </h1>

        <h1 className="title right">
          &lt;coder&gt;
          <p className="subtitle">
            Thoughtful code. Beautiful results. Followed by a nice cup of tea.
          </p>
        </h1>
      </div>
    </>
  );
}

export default App;
