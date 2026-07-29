import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import EventCard from "../components/EventCard";
import "./MyEvents.css";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
  console.log("User:", user);

  if (user?.id) {
    fetchRegisteredEvents();
  }
}, [user]);

  const fetchRegisteredEvents = async () => {
  try {
    const response = await API.get(`/registrations/${user.id}`);

    console.log("API Response:", response.data);

    setEvents(response.data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

console.log("Events State:", events);

  return (
    <div className="my-events-page">

      <div className="my-events-header">
        <h1>My Registered Events</h1>
        <p>
          Your personalized dashboard for upcoming bookings and activities.
        </p>
      </div>

      <div className="my-events-content">
        {events.length > 0 ? (
          <div className="my-events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state-card">

            <div className="empty-icon">📅</div>

            <h3>No Registered Events Found</h3>

            <p>
              Explore the events directory and secure your spot today!
            </p>

            <Link to="/events">
              <button className="browse-btn">
                Browse Events
              </button>
            </Link>

          </div>
        )}
      </div>

    </div>
  );
}

export default MyEvents;