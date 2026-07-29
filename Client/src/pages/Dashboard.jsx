import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Block */}
        <div className="dashboard-header">
          <h1>Control Center</h1>
          <h2>Welcome back, <span className="user-highlight">{user?.name || "User"}</span> 👋</h2>
        </div>

        {/* Info Grid Split */}
        <div className="user-info-box">
          <div className="info-item">
            <span className="info-label">Email Account</span>
            <p className="info-value">{user?.email || "N/A"}</p>
          </div>
          <div className="info-item border-left">
            <span className="info-label">Access Level</span>
            <p className="info-value role-badge">{user?.role || "Student"}</p>
          </div>
        </div>

        <div className="actions-divider"></div>

        {/* Quick Actions Matrix */}
        <div className="quick-actions-section">
          <h3>Quick Navigation</h3>
          
          <div className="actions-grid">
            <Link to="/events" className="action-card-link">
              <div className="action-card">
                <div className="action-icon">📅</div>
                <h4>Explore Events</h4>
                <p>Browse, search, and register for campus activities.</p>
              </div>
            </Link>

            <Link to="/add-event" className="action-card-link">
              <div className="action-card">
                <div className="action-icon">✨</div>
                <h4>Create Event</h4>
                <p>Launch a new workshop, contest, or seminar.</p>
              </div>
            </Link>

            <Link to="/profile" className="action-card-link">
              <div className="action-card">
                <div className="action-icon">👤</div>
                <h4>My Profile</h4>
                <p>Manage account settings and view metrics.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;