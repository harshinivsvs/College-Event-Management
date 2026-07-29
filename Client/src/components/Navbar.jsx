import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaCalendarCheck className="logo-icon" />
        <span>EventHub</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link
            className={location.pathname === "/" ? "active" : ""}
            to="/"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            className={location.pathname === "/events" ? "active" : ""}
            to="/events"
          >
            Events
          </Link>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <Link
                className={location.pathname === "/add-event" ? "active" : ""}
                to="/add-event"
              >
                Add Event
              </Link>
            </li>

            <li>
              <Link
                className={location.pathname === "/my-events" ? "active" : ""}
                to="/my-events"
              >
                My Events
              </Link>
            </li>

            <li>
              <Link
                className={location.pathname === "/dashboard" ? "active" : ""}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className={location.pathname === "/profile" ? "active" : ""}
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <li>
              <Link
                className={location.pathname === "/register" ? "active" : ""}
                to="/register"
              >
                Register
              </Link>
            </li>

            <li>
              <Link
                className={location.pathname === "/login" ? "active" : ""}
                to="/login"
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;