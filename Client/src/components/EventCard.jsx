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
    if (!window.confirm("Delete this event?")) return;

    try {
      await API.delete(`/events/${event.id}`);
      alert("Event Deleted Successfully");
      window.location.reload();
    } catch {
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
        return <FaLaptopCode />;

      case "sports":
        return <FaFutbol />;

      case "cultural":
        return <FaMusic />;

      case "workshop":
        return <FaChalkboardTeacher />;

      case "seminar":
        return <FaMicrophone />;

      case "hackathon":
        return <FaRocket />;

      default:
        return <FaTag />;
    }
  };

  return (

    <div className="event-card">

      {/* Banner */}

      <div className="event-banner">

        <div className="banner-content">

          <h2>{event.title}</h2>

          <span className="category">

            {getCategoryIcon(event.category)}

            {event.category || "General"}

          </span>

        </div>

      </div>

      {/* Body */}

      <div className="event-content">

        <p className="description">

          {event.description}

        </p>

        <div className="event-meta">

          <div className="meta-row">

            <FaCalendarAlt className="icon"/>

            <span>

              {new Date(event.event_date).toLocaleDateString(
                "en-IN",
                {
                  day:"numeric",
                  month:"long",
                  year:"numeric",
                }
              )}

            </span>

          </div>

          <div className="meta-row">

            <FaClock className="icon"/>

            <span>{event.event_time || "10:00 AM"}</span>

          </div>

          <div className="meta-row">

            <FaMapMarkerAlt className="icon"/>

            <span>{event.venue}</span>

          </div>

          <div className="meta-row">

            <FaUserTie className="icon"/>

            <span>{event.organizer || "EventHub Team"}</span>

          </div>

        </div>

        <div className="button-group">

          <Link
            to={`/events/${event.id}`}
            className="btn view-btn"
          >
            View Details
          </Link>

          {role === "student" && (

            <button
              className="btn register-btn"
              onClick={handleRegister}
            >
              Register
            </button>

          )}

          {role === "organizer" && (
            <>

              <Link
                to={`/edit-event/${event.id}`}
                className="btn edit-btn"
              >
                Edit
              </Link>

              <button
                className="btn delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>

            </>
          )}

        </div>

      </div>

    </div>

  );

}

export default EventCard;