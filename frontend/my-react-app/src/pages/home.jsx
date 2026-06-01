import Navbar from "../components/navbar";
import "../Home_page.css";
import { Link } from "react-router-dom";

function Home_page() {
  return (
    <div className="home_page">
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Stay Organized. Get Things Done. Effortlessly.</h1>

        <p className="content">
          Manage your tasks, track your progress, and boost your productivity — all in one simple and powerful platform.
        </p>

      <Link to="/dashboard" className="btn">
  Get Started
</Link>
      </div>

      {/* ABOUT SECTION */}
      <div className="about_section">
        <h2>What is this Task Manager?</h2>

        <p className="about_text">
          Our Task Manager is a simple yet powerful productivity tool designed to help you organize your daily work efficiently.
          It allows you to create, manage, and track tasks in a structured way so you can stay focused and achieve your goals faster.
        </p>

        <p className="about_text">
          Whether you're a student managing assignments, a professional handling projects, or just someone who wants to stay organized,
          this platform provides everything you need to plan, prioritize, and complete tasks effectively.
        </p>

        {/* HIGHLIGHT CARDS */}
        <div className="about_highlights">
          <div className="highlight_card">
            <h3>🎯 Stay Focused</h3>
            <p>Prioritize tasks and avoid distractions.</p>
          </div>

          <div className="highlight_card">
            <h3>⚡ Boost Productivity</h3>
            <p>Track progress and complete tasks faster.</p>
          </div>

          <div className="highlight_card">
            <h3>📂 Stay Organized</h3>
            <p>Manage all your work in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_page;