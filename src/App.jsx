import { useState } from "react";
import "./App.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "#contact", short: "GH" },
  { label: "LinkedIn", href: "#contact", short: "IN" },
  { label: "Facebook", href: "#contact", short: "FB" },
];

const stats = [
  { value: "10+", label: "Projects" },
  { value: "12+", label: "Technologies" },
  { value: "4 yrs", label: "Experience" },
  { value: "5+", label: "Systems Built" },
];

const skills = [
  {
    icon: "WD",
    name: "Laravel & PHP",
    description: "Building structured web apps, dashboards, and management systems.",
  },
  {
    icon: "JS",
    name: "JavaScript & React",
    description: "Creating responsive interfaces with clean component-driven UI.",
  },
  {
    icon: "DB",
    name: "MS SQL & Databases",
    description: "Designing reliable data structures for practical business workflows.",
  },
  {
    icon: "UX",
    name: "UI/UX Design",
    description: "Designing simple layouts, clear flows, and polished visual systems.",
  },
  {
    icon: "IT",
    name: "Technical Support",
    description: "Troubleshooting systems, networks, hardware, and software issues.",
  },
  {
    icon: "GD",
    name: "Graphic Design",
    description: "Producing clean visual assets with Photoshop, Canva, and brand tools.",
  },
];

const projects = [
  {
    title: "MabuHighTrack",
    description:
      "A student performance and analytics platform for grading, performance tracking, and academic insights.",
    stack: ["Laravel", "PHP", "JavaScript", "MS SQL"],
  },
  {
    title: "Digital Branding Website",
    description:
      "A clean company website and social media presence designed to support brand visibility.",
    stack: ["Wix", "Canva", "Photoshop"],
  },
  {
    title: "Technical Support Workflow",
    description:
      "A practical support process for handling troubleshooting, documentation, and service requests.",
    stack: ["Networking", "CSS NCII", "Office"],
  },
];

const services = [
  {
    icon: "01",
    title: "Web Development",
    description: "Responsive portfolio, landing page, and business website development.",
  },
  {
    icon: "02",
    title: "UI/UX Design",
    description: "Modern layouts, interface polish, and user-friendly design systems.",
  },
  {
    icon: "03",
    title: "System Development",
    description: "Academic, office, and management systems built around real workflows.",
  },
  {
    icon: "04",
    title: "Database Design",
    description: "Organized data models and database structures for scalable applications.",
  },
];

const certifications = [
  "CISCO Introduction to Cybersecurity",
  "TESDA Introduction to Visual Graphic Design",
  "Computer Systems Servicing NCII",
];

export default function App() {
  const [showProfileImage, setShowProfileImage] = useState(true);

  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="navbar" aria-label="Primary navigation">
        <div className="nav-container">
          <a className="logo" href="#home" aria-label="Zyrah Faith Gascon home">
            <span>ZFG</span>
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="nav-cta" href="#contact">
            Let's Talk
          </a>
        </div>
      </nav>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy reveal">
            <span className="eyebrow">FULL STACK DEVELOPER</span>
            <h1>Building clean and modern digital experiences.</h1>
            <p>
              I design and develop scalable systems, responsive websites, and
              user-friendly applications focused on simplicity, usability, and
              performance.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                View Projects
              </a>
              <a className="btn btn-secondary" href="#contact">
                Contact Me
              </a>
            </div>

            <div className="social-links" aria-label="Social links">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  {link.short}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal delay-1">
            <div className="profile-card">
              <div className="profile-glow" />
              <div className="profile-frame">
                {showProfileImage ? (
                  <img
                    src="/profile.jpg"
                    alt="Zyrah Faith Gascon"
                    onError={() => setShowProfileImage(false)}
                  />
                ) : (
                  <div className="profile-fallback" aria-label="Zyrah Faith Gascon">
                    ZFG
                  </div>
                )}
              </div>
              <div className="profile-meta">
                <strong>Zyrah Faith C. Gascon</strong>
                <span>BSIT Graduate | Developer | Designer</span>
              </div>
            </div>

            <span className="tech-badge badge-top">Laravel</span>
            <span className="tech-badge badge-right">React</span>
            <span className="tech-badge badge-bottom">MS SQL</span>
          </div>
        </section>

        <section id="about" className="section-shell section-block">
          <div className="section-heading reveal">
            <span className="eyebrow">ABOUT</span>
            <h2>About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy glass-card reveal">
              <p>
                I specialize in building modern web applications and management
                systems using Laravel, PHP, JavaScript, and modern frontend
                technologies.
              </p>
              <p>
                My focus is creating clean, scalable, and user-friendly systems
                with smooth user experiences and modern interfaces.
              </p>
              <p>
                I also bring hands-on experience in graphic design, technical
                support, networking, troubleshooting, and database management.
              </p>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div className="stat-card reveal" style={{ "--delay": `${index * 80}ms` }} key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell section-block">
          <div className="section-heading centered reveal">
            <span className="eyebrow">CAPABILITIES</span>
            <h2>Skills shaped for practical, polished products.</h2>
            <p>
              A focused set of technical, design, and support skills for building
              useful systems from concept to delivery.
            </p>
          </div>

          <div className="card-grid">
            {skills.map((skill, index) => (
              <article className="skill-card reveal" style={{ "--delay": `${index * 70}ms` }} key={skill.name}>
                <span className="card-icon">{skill.icon}</span>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell section-block">
          <div className="section-heading reveal">
            <span className="eyebrow">SELECTED WORK</span>
            <h2>Projects</h2>
          </div>

          <article className="featured-project reveal">
            <div className="dashboard-mockup" aria-hidden="true">
              <div className="mockup-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar" />
                <div className="mockup-content">
                  <div className="mockup-chart" />
                  <div className="mockup-rows">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-copy">
              <span className="eyebrow">FEATURED PROJECT</span>
              <h2>MabuHighTrack</h2>
              <p>
                A modern student performance and analytics platform designed to
                streamline grading, performance tracking, and academic insights
                through intuitive dashboards and automated workflows.
              </p>
              <div className="stack-list">
                {["Laravel", "PHP", "JavaScript", "Analytics", "Dashboards"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card reveal" style={{ "--delay": `${index * 90}ms` }} key={project.title}>
                <div className="project-preview">
                  <div className="preview-window">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="preview-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="stack-list">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="sample-output-card reveal">
            <p>Want to see more visual work and sample outputs?</p>
            <a
              className="btn btn-secondary"
              href="https://drive.google.com/drive/folders/1UWv_ITecoDW8d9zH3YmyR4fiyhbG2b0y?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Sample Outputs
            </a>
          </div>
        </section>

        <section id="services" className="section-shell section-block">
          <div className="section-heading centered reveal">
            <span className="eyebrow">SERVICES</span>
            <h2>Clean solutions for digital products and systems.</h2>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card reveal" style={{ "--delay": `${index * 80}ms` }} key={service.title}>
                <span>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section-block resume-strip reveal">
          <div>
            <span className="eyebrow">BACKGROUND</span>
            <h2>Education, experience, and certifications.</h2>
          </div>
          <div className="timeline-grid">
            <article className="glass-card">
              <h3>Bachelor of Science in Information Technology</h3>
              <p>Davao Del Norte State College</p>
            </article>
            <article className="glass-card">
              <h3>Experience</h3>
              <p>Graphic design, technical support, digital branding, and social media management.</p>
            </article>
            <article className="glass-card">
              <h3>Certifications</h3>
              <ul>
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className="section-shell section-block contact-section">
          <div className="contact-copy reveal">
            <span className="eyebrow">CONTACT</span>
            <h2>Let's create something meaningful.</h2>
            <p>
              Have a project, system, or website in mind? Send a message and I
              will get back to you as soon as possible.
            </p>

            <div className="contact-links">
              <a href="mailto:zyrahfaithcubagascon@gmail.com">
                zyrahfaithcubagascon@gmail.com
              </a>
              <a href="tel:09683977269">0968 397 7269</a>
            </div>

            <div className="social-links">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  {link.short}
                </a>
              ))}
            </div>
          </div>

          <form
            className="contact-form reveal delay-1"
            action="mailto:zyrahfaithcubagascon@gmail.com"
            method="post"
            encType="text/plain"
          >
            <label>
              Name
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" placeholder="Tell me about your project" required />
            </label>
            <button className="btn btn-primary" type="submit">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="footer section-shell">
        <a className="logo" href="#home">
          <span>ZFG</span>
        </a>
        <div className="footer-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <p>Copyright 2026 Zyrah Faith C. Gascon. All rights reserved.</p>
      </footer>
    </div>
  );
}
