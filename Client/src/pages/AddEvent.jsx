import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Only Organizer can access
    if (user.role !== "organizer") {
      alert("Access Denied! Only Organizers can create events.");
      navigate("/events");
    }
  }, [navigate]);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    event_date: "",
    venue: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/events", event);

      alert("Event Added Successfully!");
      navigate("/events");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to add event");
      }
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">

        <div className="form-header">
          <h1>Create New Event</h1>
          <p>Fill out the details below to launch your campus event.</p>
        </div>

        <form className="event-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={event.title}
              placeholder="Annual Hackathon 2026"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Category</label>

            <select
              name="category"
              value={event.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Seminar">Seminar</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
            </select>
          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                name="event_date"
                value={event.event_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={event.venue}
                placeholder="Main Auditorium"
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              name="description"
              value={event.description}
              placeholder="Describe your event..."
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            🚀 Publish Event
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddEvent;