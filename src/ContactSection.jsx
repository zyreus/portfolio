import { useState } from "react";

const CONTACT_EMAIL = "zyrahfaithcubagascon@gmail.com";

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/", short: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com/", short: "IN" },
  { label: "Facebook", href: "https://facebook.com/", short: "FB" },
  {
    label: "Gmail",
    href: `mailto:${CONTACT_EMAIL}`,
    short: "GM",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection({ className = "" }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const isSuccess = status === "success";
  const isError = status === "error";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setFeedbackMessage("");
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedForm = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedForm.name || !trimmedForm.email || !trimmedForm.message) {
      setStatus("error");
      setFeedbackMessage("Please complete all fields before sending.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedForm.email)) {
      setStatus("error");
      setFeedbackMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedForm),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setFeedbackMessage(
          data.error || "Something went wrong while sending. Please try again.",
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data.message || "Message sent successfully! I'll get back to you soon.",
      );
      setFormData(initialFormData);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
      setFeedbackMessage(
        "Unable to reach the server. Use Copy email or Gmail to contact me directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact-section compact-contact ${className}`.trim()}>
      <div className="contact-copy reveal">
        <div className="contact-meta">
          <article className="glass-card">
            <span>Email</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button
              className="btn btn-secondary copy-email-btn"
              type="button"
              onClick={handleCopyEmail}
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </article>
          <article className="glass-card">
            <span>Location</span>
            <p>Philippines</p>
          </article>
          <article className="glass-card">
            <span>Social Links</span>
            <div className="social-links" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  {link.short}
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>

      <form
        className="contact-form reveal delay-1"
        onSubmit={handleSubmit}
        noValidate
      >
        <label>
          Name
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="5"
            placeholder="Tell me about your project"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </label>
        {isSuccess ? (
          <p className="form-alert form-alert-success" role="status">
            {feedbackMessage}
          </p>
        ) : null}
        {isError ? (
          <p className="form-alert form-alert-error" role="alert">
            {feedbackMessage}
          </p>
        ) : null}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
          {loading ? "Sending..." : isSuccess ? "Message Sent ✓" : "Send Message"}
        </button>
      </form>
    </section>
  );
}
