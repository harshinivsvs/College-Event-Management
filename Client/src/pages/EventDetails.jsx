import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <h2>Loading Event Details...</h2>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <div className="details-card">
        {/* Left Side: Main Info */}
        <div className="details-main">
          <span className="event-category-badge">Featured Event</span>
          <h1>{event.title}</h1>
          
          <div className="details-section">
            <h3>About This Event</h3>
            <p className="description">{event.description}</p>
          </div>
        </div>

        {/* Right Side: Quick Meta Details Box */}
        <div className="details-sidebar">
          <h3>Event Information</h3>
          
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <div>
              <label>Date & Time</label>
              <p>{event.event_date}</p>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <div>
              <label>Venue</label>
              <p>{event.venue}</p>
            </div>
          </div>

          <button className="register-btn">Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;