import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xrbndkrd", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <h2 className="reveal">Contact</h2>

        <p className="contact-intro">
          If you’d like to discuss a project, collaboration, or just say hello,
          feel free to get in touch.
        </p>

        {status === "success" && (
          <div className="contact-message success" aria-live="polite">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <span>
              Thanks — your message has been sent. I’ll be in touch shortly.
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="contact-message error" aria-live="polite">
            <i
              className="fa-solid fa-circle-exclamation"
              aria-hidden="true"
            ></i>
            <span>Something went wrong. Please try again later.</span>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required />
          </div>

          <button
            type="submit"
            className="contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
