import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import API from "../services/api";
import "./ViewEvents.css";

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="events-page">

      <div className="events-header">

        <h1>Explore Events</h1>

        <p>
          Discover workshops, hackathons, seminars and exciting campus events.
        </p>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Seminar">Seminar</option>
          <option value="Sports">Sports</option>
        </select>

      </div>

      <div className="events-grid">

        {filteredEvents.length > 0 ? (

          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              role={role}
              currentUser={user}
            />
          ))

        ) : (

          <div className="no-events">
            <h2>No Events Found</h2>
            <p>Try changing the search or category.</p>
          </div>

        )}

      </div>

    </section>
  );
}

export default ViewEvents;