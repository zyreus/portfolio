import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ContactSection from "./ContactSection.jsx";
import "./App.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Certifications", path: "/certifications" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "/contact", short: "GH" },
  { label: "LinkedIn", href: "/contact", short: "IN" },
  { label: "Facebook", href: "/contact", short: "FB" },
];

const stats = [
  { value: "10+", label: "Projects" },
  { value: "12+", label: "Technologies" },
  { value: "4 yrs", label: "Experience" },
  { value: "5+", label: "Systems Built" },
];

const skills = [
  {
    icon: "FE",
    name: "Frontend Development",
    description:
      "Creating responsive and modern user interfaces with clean and intuitive user experiences.",
  },
  {
    icon: "BE",
    name: "Backend Development",
    description:
      "Developing scalable server-side applications, APIs, and business logic using Laravel and PHP.",
  },
  {
    icon: "DB",
    name: "Database Management",
    description:
      "Designing optimized and structured databases for secure and efficient data management.",
  },
  {
    icon: "UX",
    name: "UI/UX Design",
    description:
      "Building clean and user-friendly digital experiences focused on simplicity and usability.",
  },
];

const projects = [
  {
    title: "Amalgated Lending",
    website: "https://amalgatedlending.com",
    description:
      "A modern lending management platform designed to streamline loan applications, borrower management, payment tracking, and financial workflows.",
    features: [
      "Loan Management",
      "Borrower Portal",
      "Payment Tracking",
      "Responsive Dashboard",
      "Admin Management System",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "TailwindCSS"],
  },
  {
    title: "The Amalgated Properties",
    website: "https://theamalgatedproperties.com",
    description:
      "A modern real estate and property management platform focused on clean property presentation and responsive user experience.",
    features: [
      "Property Listings",
      "Responsive Interface",
      "Client Inquiry System",
      "Modern UI/UX",
      "Admin Dashboard",
    ],
    stack: ["Laravel", "PHP", "JavaScript", "MySQL"],
  },
  {
    title: "AGC Tek",
    website: "https://agctek.co",
    description:
      "A professional technology and digital solutions website built with a clean modern interface focused on branding and services.",
    features: [
      "Corporate Website",
      "Service Showcase",
      "Responsive Design",
      "Professional Branding",
      "Optimized Performance",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
];

const services = [
  {
    icon: "01",
    title: "Web Application Development",
    description:
      "Building scalable and modern business systems and web applications.",
  },
  {
    icon: "02",
    title: "UI/UX Design",
    description: "Designing clean and user-friendly digital experiences.",
  },
  {
    icon: "03",
    title: "System Development",
    description:
      "Developing efficient management systems and workflow solutions.",
  },
  {
    icon: "04",
    title: "Technical Support",
    description:
      "Providing troubleshooting and technical assistance for software, hardware, and network concerns.",
  },
];

const certifications = [
  "Cisco Introduction to Cybersecurity",
  "Cisco Cybersecurity Essentials",
  "CCNAv7 Introduction to Networks",
  "CSS NCII Training",
  "Social Media Management",
  "EF SET English Certificate",
];

const experience = [
  {
    role: "Social Media Specialist",
    organization: "Amalgated Capital Inc.",
    description:
      "Managed social media platforms, improved engagement, and contributed to website development and branding.",
  },
  {
    role: "Social Media Manager",
    organization: "Institute of Computing Student Association",
    description:
      "Handled social media strategies, promotional materials, event promotions, and online engagement.",
  },
  {
    role: "On-the-Job Training",
    organization: "Maryknoll College of Panabo, Inc.",
    description:
      "Provided technical support, troubleshooting, documentation, graphic design, and IT assistance.",
  },
];

const technologies = [
  "Laravel",
  "PHP",
  "JavaScript",
  "React",
  "TailwindCSS",
  "MySQL",
  "HTML",
  "CSS",
  "Git",
  "Technical Support",
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main className="page-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
}

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="nav-container">
        <Link className="logo" to="/" aria-label="Zyrah Faith Gascon home">
          <span>ZFG</span>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive || (link.path === "/" && pathname === "/home")
                  ? "active"
                  : undefined
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link className="nav-cta" to="/contact">
          Let's Talk
        </Link>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy reveal">
          <span className="eyebrow">
            FULL STACK DEVELOPER • GRAPHIC DESIGNER • TECH SUPPORT
          </span>
          <h1>Building Modern and User-Friendly Digital Experiences</h1>
          <p>
            I develop scalable web applications, responsive websites, and modern
            management systems focused on clean design, usability, and
            performance.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/projects">
              View Projects
            </Link>
            <Link className="btn btn-secondary" to="/contact">
              Contact Me
            </Link>
          </div>

          <SocialLinks />
        </div>

        <ProfileVisual />
      </section>

      <section className="section-shell section-block">
        <div className="home-intro-grid">
          <div className="about-copy glass-card reveal">
            <span className="eyebrow">INTRODUCTION</span>
            <h2>Clean systems, polished interfaces, and practical solutions.</h2>
            <p>
              I am a BSIT graduate building modern digital products across full
              stack development, graphic design, technical support, and social
              media management.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                className="stat-card reveal"
                style={{ "--delay": `${index * 80}ms` }}
                key={stat.label}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsPreview />
      <SkillsPreview />
      <CtaSection />

      <section className="section-shell section-block">
        <div className="section-heading centered reveal">
          <span className="eyebrow">CONTACT</span>
          <h2>Let's build something meaningful together.</h2>
          <p>
            Interested in working together? Send a message and let's discuss
            your ideas and projects.
          </p>
        </div>
        <ContactSection />
      </section>
    </>
  );
}

function ProfileVisual() {
  const [showProfileImage, setShowProfileImage] = useState(true);

  return (
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
      <span className="tech-badge badge-bottom">MySQL</span>
    </div>
  );
}

function ProjectsPreview() {
  return (
    <section className="section-shell section-block">
      <div className="section-heading reveal">
        <span className="eyebrow">FEATURED WORK</span>
        <h2>Selected projects built with clean structure and responsive design.</h2>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}

function SkillsPreview() {
  return (
    <section className="section-shell section-block">
      <div className="section-heading centered reveal">
        <span className="eyebrow">SKILLS PREVIEW</span>
        <h2>Core skills for modern web and system development.</h2>
        <p>
          A focused blend of frontend, backend, database, and interface design
          skills for building polished digital products.
        </p>
      </div>

      <div className="card-grid">
        {skills.map((skill, index) => (
          <SkillCard skill={skill} index={index} key={skill.name} />
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section-shell section-block">
      <div className="cta-card reveal">
        <div>
          <span className="eyebrow">READY TO COLLABORATE</span>
          <h2>Let's build a modern digital solution that feels easy to use.</h2>
        </div>
        <Link className="btn btn-primary" to="/contact">
          Start a Conversation
        </Link>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="ABOUT" title="About Me">
      <div className="about-grid">
        <div className="about-copy glass-card reveal">
          <p>
            I am a Bachelor of Science in Information Technology graduate with
            experience in full stack development, technical support, graphic
            design, and social media management.
          </p>
          <p>
            I specialize in creating scalable web applications, modern
            interfaces, and user-friendly digital systems using Laravel, PHP,
            JavaScript, and modern frontend technologies.
          </p>
          <p>
            My goal is to build clean, efficient, and visually polished
            solutions that provide meaningful user experiences.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              className="stat-card reveal"
              style={{ "--delay": `${index * 80}ms` }}
              key={stat.label}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="section-block compact-block">
        <div className="section-heading reveal">
          <span className="eyebrow">TECHNICAL SKILLS</span>
          <h2>Practical capabilities across design, development, and support.</h2>
        </div>
        <div className="card-grid">
          {skills.map((skill, index) => (
            <SkillCard skill={skill} index={index} key={skill.name} />
          ))}
        </div>
      </section>

      <section className="section-block compact-block">
        <div className="resume-strip reveal">
          <div>
            <span className="eyebrow">EDUCATION</span>
            <h2>Bachelor of Science in Information Technology</h2>
          </div>
          <div className="timeline-grid">
            <article className="glass-card">
              <h3>Davao Del Norte State College</h3>
              <p>
                Built a foundation in software development, information systems,
                databases, technical support, and modern web technologies.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block compact-block">
        <div className="section-heading reveal">
          <span className="eyebrow">TECHNOLOGIES</span>
          <h2>Tools and platforms I use to build polished digital products.</h2>
        </div>
        <div className="technology-grid">
          {technologies.map((technology, index) => (
            <span
              className="technology-pill reveal"
              style={{ "--delay": `${index * 45}ms` }}
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function ProjectsPage() {
  const [featuredProject, ...otherProjects] = projects;

  return (
    <PageShell
      eyebrow="PROJECTS"
      title="Professional project showcase"
      description="Modern web platforms and business systems presented in clean, responsive project cards."
    >
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
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.description}</p>
          <a
            className="btn btn-secondary"
            href={featuredProject.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
          <StackList items={featuredProject.stack} />
        </div>
      </article>

      <div className="project-grid">
        {otherProjects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
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
    </PageShell>
  );
}

function ExperiencePage() {
  return (
    <PageShell
      eyebrow="EXPERIENCE"
      title="Professional experience"
      description="A focused timeline of development, support, branding, and social media work."
    >
      <div className="experience-list">
        {experience.map((item, index) => (
          <article
            className="experience-card reveal"
            style={{ "--delay": `${index * 90}ms` }}
            key={`${item.role}-${item.organization}`}
          >
            <span className="experience-index">0{index + 1}</span>
            <div>
              <h3>{item.role}</h3>
              <strong>{item.organization}</strong>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function CertificationsPage() {
  return (
    <PageShell
      eyebrow="CERTIFICATIONS"
      title="Certifications and training"
      description="Professional learning across cybersecurity, networking, technical support, English, and digital management."
    >
      <div className="certification-grid">
        {certifications.map((certification, index) => (
          <article
            className="certification-card reveal"
            style={{ "--delay": `${index * 70}ms` }}
            key={certification}
          >
            <span className="card-icon">{certificationInitials(certification)}</span>
            <h3>{certification}</h3>
            <p>Completed certification and professional development training.</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title="Professional services for modern digital solutions."
      description="Focused services for businesses, organizations, and teams that need clean digital systems and support."
    >
      <div className="service-grid">
        {services.map((service, index) => (
          <article
            className="service-card reveal"
            style={{ "--delay": `${index * 80}ms` }}
            key={service.title}
          >
            <span>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      eyebrow="CONTACT"
      title="Let's Build Something Meaningful Together"
      description="Interested in working together or building a modern digital solution? Feel free to reach out and let's discuss your ideas and projects."
    >
      <ContactSection />
    </PageShell>
  );
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <div className="page-shell section-shell">
      <header className="page-hero reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className="project-card reveal"
      style={{ "--delay": `${index * 90}ms` }}
    >
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
        <a href={project.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
        <StackList items={project.stack} />
      </div>
    </article>
  );
}

function SkillCard({ skill, index }) {
  return (
    <article
      className="skill-card reveal"
      style={{ "--delay": `${index * 70}ms` }}
    >
      <span className="card-icon">{skill.icon}</span>
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </article>
  );
}

function StackList({ items }) {
  return (
    <div className="stack-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social links">
      {socialLinks.map((link) => (
        <Link key={link.label} to={link.href} aria-label={link.label}>
          {link.short}
        </Link>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer section-shell">
      <Link className="logo" to="/">
        <span>ZFG</span>
      </Link>
      <div className="footer-links">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
      <p>Building modern and user-focused digital experiences.</p>
    </footer>
  );
}

function certificationInitials(certification) {
  if (certification.startsWith("Cisco")) return "CI";
  if (certification.startsWith("CCNA")) return "CN";
  if (certification.startsWith("CSS")) return "CS";
  if (certification.startsWith("EF")) return "EF";
  return certification
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
