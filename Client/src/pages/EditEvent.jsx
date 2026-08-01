import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./AddEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Role Protection
  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (user.role === "student") {
      alert("Access Denied! Students cannot edit events.");
      navigate("/events");
      return;
    }

    fetchEvent();
  }, []);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    event_date: "",
    venue: "",
    category: "",
  });

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load event");
    }
  };

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/events/${id}`, event);

      alert("Event Updated Successfully!");
      navigate("/events");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to update event");
      }
    }
  };

  return (
    <div className="add-event-container">
      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} className="event-form">

        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="event_date"
          value={event.event_date?.substring(0, 10)}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="venue"
          value={event.venue}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Event
        </button>

      </form>
    </div>
  );
}

export default EditEvent;