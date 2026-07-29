import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="tag">🎉 Welcome to EventHub</span>
          <h1>
            College Event <br />
            <span className="gradient-text">Management System</span>
          </h1>
          <p>
            Discover workshops, hackathons, seminars, and cultural events. 
            Register instantly and never miss an exciting opportunity on campus.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events
            </Link>
            <Link to="/add-event" className="secondary-btn">
              Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>50+</h2>
            <p>🎉 Events Hosted</p>
          </div>
          <div className="stat-card">
            <h2>1200+</h2>
            <p>👨‍🎓 Active Students</p>
          </div>
          <div className="stat-card">
            <h2>15+</h2>
            <p>🏆 Campus Clubs</p>
          </div>
          <div className="stat-card">
            <h2>100%</h2>
            <p>✅ Secure Platform</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose EventHub?</h2>
          <p>We provide the ultimate campus experience management.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Easy Registration</h3>
            <p>Register for your favorite events with a single click instantly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Event Scheduling</h3>
            <p>View and track all upcoming college events in one central place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Club Activities</h3>
            <p>Participate actively in technical, sports, and cultural club events.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Login</h3>
            <p>Your account details are fully protected with standard JWT authentication.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;