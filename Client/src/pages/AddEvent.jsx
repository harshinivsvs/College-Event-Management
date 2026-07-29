import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  // FIXED: State keys now perfectly match input names
  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    event_date: "",
    venue: ""
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
      alert("Failed to add event");
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <div className="form-header">
          <h1>Create New Event</h1>
          <p>Fill out the details below to launch your campus event.</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="input-group">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Annual Hackathon 2026"
              value={event.title}
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
              <label>Venue Location</label>
              <input
                type="text"
                name="venue"
                placeholder="e.g. Main Auditorium"
                value={event.venue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Event Description</label>
            <textarea
              name="description"
              placeholder="Describe what your event is about, rules, and timelines..."
              value={event.description}
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