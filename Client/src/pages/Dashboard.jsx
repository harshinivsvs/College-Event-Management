import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Control Center</h1>

          <h2>
            Welcome back,
            <span className="user-highlight">
              {" "}{user?.name || "User"}
            </span>{" "}
            👋
          </h2>
        </div>

        <div className="user-info-box">
          <div className="info-item">
            <span className="info-label">Email Account</span>
            <p className="info-value">
              {user?.email}
            </p>
          </div>

          <div className="info-item border-left">
            <span className="info-label">Access Level</span>

            <p className="info-value role-badge">
              {role}
            </p>
          </div>
        </div>

        <div className="actions-divider"></div>

        <div className="quick-actions-section">

          <h3>Quick Navigation</h3>

          <div className="actions-grid">

            {/* Everyone */}

            <Link to="/events" className="action-card-link">
              <div className="action-card">
                <div className="action-icon">📅</div>

                <h4>Explore Events</h4>

                <p>
                  Browse all upcoming campus events.
                </p>
              </div>
            </Link>

            {/* Student */}

            {role === "student" && (
              <Link
                to="/my-events"
                className="action-card-link"
              >
                <div className="action-card">

                  <div className="action-icon">🎟️</div>

                  <h4>My Registrations</h4>

                  <p>
                    View all registered events.
                  </p>

                </div>
              </Link>
            )}

            {/* Organizer */}

            {role === "organizer" && (
              <>
                <Link
                  to="/add-event"
                  className="action-card-link"
                >
                  <div className="action-card">

                    <div className="action-icon">✨</div>

                    <h4>Create Event</h4>

                    <p>
                      Create and publish new events.
                    </p>

                  </div>
                </Link>

                <Link
                  to="/my-events"
                  className="action-card-link"
                >
                  <div className="action-card">

                    <div className="action-icon">📋</div>

                    <h4>My Events</h4>

                    <p>
                      Manage your created events.
                    </p>

                  </div>
                </Link>
              </>
            )}

            {/* Admin */}

            {role === "admin" && (
              <>
                <Link
                  to="/add-event"
                  className="action-card-link"
                >
                  <div className="action-card">

                    <div className="action-icon">✨</div>

                    <h4>Create Event</h4>

                    <p>
                      Create campus events.
                    </p>

                  </div>
                </Link>

                <Link
                  to="/my-events"
                  className="action-card-link"
                >
                  <div className="action-card">

                    <div className="action-icon">🛠️</div>

                    <h4>Manage Events</h4>

                    <p>
                      Edit or delete any event.
                    </p>

                  </div>
                </Link>

                <Link
                  to="/profile"
                  className="action-card-link"
                >
                  <div className="action-card">

                    <div className="action-icon">👥</div>

                    <h4>Manage Users</h4>

                    <p>
                      View system users.
                    </p>

                  </div>
                </Link>
              </>
            )}

            {/* Everyone */}

            <Link
              to="/profile"
              className="action-card-link"
            >
              <div className="action-card">

                <div className="action-icon">👤</div>

                <h4>Profile</h4>

                <p>
                  View and update your profile.
                </p>

              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;