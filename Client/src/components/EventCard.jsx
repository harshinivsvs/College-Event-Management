import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaLaptopCode,
  FaMusic,
  FaFutbol,
  FaChalkboardTeacher,
  FaMicrophone,
  FaRocket,
  FaClock,
  FaUserTie,
} from "react-icons/fa";
import "./EventCard.css";
import API from "../services/api";

function EventCard({ event }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${event.id}`);
      alert("Event Deleted Successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await API.post("/registrations", {
        user_id: user.id,
        event_id: event.id,
      });

      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration Failed");
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch ((category || "").toLowerCase()) {
      case "technical":
      case "coding":
        return <FaLaptopCode className="category-icon" />;

      case "sports":
        return <FaFutbol className="category-icon" />;

      case "cultural":
        return <FaMusic className="category-icon" />;

      case "workshop":
        return <FaChalkboardTeacher className="category-icon" />;

      case "seminar":
        return <FaMicrophone className="category-icon" />;

      case "hackathon":
        return <FaRocket className="category-icon" />;

      default:
        return <FaTag className="category-icon" />;
    }
  };

  return (
    <div className="event-card">

      <div className="event-header">
        <h2>{event.title}</h2>

        <span className="category">
          {getCategoryIcon(event.category)}
          {event.category}
        </span>
      </div>

      <div className="event-body">

        <p className="description">
          {event.description}
        </p>

        <div className="details">

          <div className="detail-item">
            <FaCalendarAlt className="icon" />
            <span>{new Date(event.event_date).toLocaleDateString()}</span>
          </div>

          <div className="detail-item">
            <FaClock className="icon" />
            <span>{event.event_time || "10:00 AM"}</span>
          </div>

          <div className="detail-item">
            <FaMapMarkerAlt className="icon" />
            <span>{event.venue}</span>
          </div>

          <div className="detail-item">
            <FaUserTie className="icon" />
            <span>{event.organizer || "EventHub Team"}</span>
          </div>

        </div>

        <div className="button-group">

          {/* Everyone */}
          <Link to={`/events/${event.id}`}>
            <button className="view-btn">
              View
            </button>
          </Link>

          {/* Organizer Only */}
          {role === "organizer" && (
            <>
              <Link to={`/edit-event/${event.id}`}>
                <button className="edit-btn">
                  Edit
                </button>
              </Link>

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}

          {/* Student */}
          {role === "student" && (
            <button
              className="register-btn"
              onClick={handleRegister}
            >
              Register
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default EventCard;