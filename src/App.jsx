import { useState } from "react";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "app dark" : "app"}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">ZFG</h1>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
            <button onClick={() => setDark(!dark)}>Toggle</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <img src="/profile.jpg" alt="Zyrah Faith Gascon" className="profile-img" />
        <h1>Zyrah Faith C. Gascon</h1>
        <p>Graphic Designer • Technical Support • BSIT Graduate</p>

        <div className="hero-buttons">
          <a href="#contact" className="primary-btn">Hire Me</a>
          <a
            href="https://drive.google.com/drive/folders/1UWv_ITecoDW8d9zH3YmyR4fiyhbG2b0y?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
          >
            Sample Outputs
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>Professional Summary</h2>
        <p>
          Bachelor of Science in Information Technology graduate with four years
          of experience in graphic design and technical support. Skilled in Adobe
          Photoshop, Canva, networking, system troubleshooting, database
          management, and providing technical assistance for hardware and software issues.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section alt">
        <h2>Work Experience</h2>

        <div className="card">
          <h3>Social Media Specialist</h3>
          <p>Amalgamated Capital Inc.</p>
          <p>Developed company website via Wix and managed digital branding.</p>
        </div>

        <div className="card">
          <h3>IT Office Intern</h3>
          <p>Maryknoll College of Panabo</p>
          <p>Provided technical support, system troubleshooting, and graphic design services.</p>
        </div>

        <div className="card">
          <h3>Social Media Manager</h3>
          <p>Institute of Computing Student Association</p>
          <p>Managed online presence and created marketing visuals.</p>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <h2>Education</h2>
        <div className="card">
          <h3>Bachelor of Science in Information Technology</h3>
          <p>Maryknoll College of Panabo</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section alt">
        <h2>Technical Skills</h2>
        <div className="skills">
          {[
            "Networking",
            "Cybersecurity",
            "MS SQL Server",
            "Computer Systems Servicing",
            "React",
            "Laravel",
            "Adobe Photoshop",
            "Canva",
            "Wix Web Creator",
            "Microsoft Office"
          ].map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <h2>Certifications</h2>
        <ul className="cert-list">
          <li>CISCO Introduction to Cybersecurity</li>
          <li>TESDA Introduction to Visual Graphic Design</li>
          <li>Computer Systems Servicing NCII</li>
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section alt">
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:zyrahfaithcubagascon@gmail.com">
            zyrahfaithcubagascon@gmail.com
          </a>
        </p>
        <p>
          <strong>Mobile:</strong>{" "}
          <a href="tel:09683977269">0968 397 7269</a>
        </p>
      </section>

      {/* STYLES */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .app {
          background: #0f172a;
          color: white;
          font-family: Arial, sans-serif;
        }

        .navbar {
          position: fixed;
          width: 100%;
          background: rgba(15,23,42,0.95);
          backdrop-filter: blur(10px);
        }

        .nav-container {
          max-width: 1200px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          padding: 20px;
        }

        .logo { color: #06b6d4; font-weight: bold; font-size: 22px; }

        .nav-links a {
          margin-right: 15px;
          color: white;
          text-decoration: none;
        }

        .nav-links button {
          background: #06b6d4;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #164e63);
          text-align: center;
          padding: 20px;
        }

        .profile-img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #06b6d4;
          margin-bottom: 20px;
        }

        .hero-buttons {
          margin-top: 20px;
          display: flex;
          gap: 15px;
        }

        .primary-btn, .secondary-btn {
          padding: 10px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
        }

        .primary-btn {
          background: #06b6d4;
          color: black;
        }

        .secondary-btn {
          border: 2px solid #06b6d4;
          color: #06b6d4;
        }

        .section {
          padding: 80px 20px;
          max-width: 1000px;
          margin: auto;
        }

        .alt { background: #1e293b; }

        .card {
          background: #1e293b;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 15px;
        }

        .skills span {
          display: inline-block;
          background: #06b6d4;
          color: black;
          padding: 6px 12px;
          margin: 5px;
          border-radius: 20px;
        }

        .cert-list {
          margin-top: 15px;
        }

        .cert-list li {
          margin-bottom: 8px;
        }

        a { color: #06b6d4; }
      `}</style>
    </div>
  );
}
