import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../About.css";


function About() {
  return (
    <div className="about_page">

      <h1 className="about_title">About Me</h1>

      {/* About Me */}
      <div className="about_card">
        <h2>👤 Who I Am</h2>
        <p>
          Hi, I'm <strong>Tejas Chaudhari</strong>, a student at IIIT Pune and an aspiring
          full stack developer. This is my first full stack project where I explored
          building complete web applications from frontend to backend.
        </p>
      </div>

      {/* About App */}
      <div className="about_card">
        <h2>⚙️ About Task Manager</h2>
        <p>
          This app helps you manage daily tasks efficiently. You can create, update,
          delete tasks, set priorities, track progress, and stay organized.
          It also supports reminders, alerts, and a dashboard with visual insights.
        </p>
      </div>

      {/* Contact */}
      <div className="about_card contact_card">
        <h2>📫 Contact Me</h2>

        <div className="contact_links">
          <a href="mailto:tejaschaudhari376@gmail.com">
            <FaEnvelope /> Email
          </a>

          <a href="https://www.linkedin.com/in/tejas-chaudhari-7021aa332/" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>

          <a href="https://github.com/TejasChaudhari-30?tab=repositories" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
        </div>
      </div>

    </div>
  );
}

export default About;