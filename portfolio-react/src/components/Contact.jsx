import "./contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <h2 className="reveal">Contact</h2>

        <p className="contact-intro">
          If you’d like to discuss a project, collaboration, or just say hello,
          feel free to get in touch.
        </p>

        <form
          className="contact-form"
          action="https://formspree.io/f/xrbndkrd"
          method="POST"
        >
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

          <button type="submit" className="contact-submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
