const db = require("../config/db");

// Get all events
const getAllEvents = (req, res) => {
    db.query("SELECT * FROM events", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch events" });
        }
        res.json(results);
    });
};

// Get event by ID
const getEventById = (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM events WHERE id = ?",
        [id],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to fetch event" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.json(results[0]);
        }
    );
};

// Add event
const addEvent = (req, res) => {
    const { title, description, event_date, venue } = req.body;

    db.query(
        "INSERT INTO events (title, description, event_date, venue) VALUES (?, ?, ?, ?)",
        [title, description, event_date, venue],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to add event" });
            }

            res.status(201).json({
                message: "Event Added Successfully",
            });
        }
    );
};

// Update event
const updateEvent = (req, res) => {
    const { id } = req.params;
    const { title, description, event_date, venue } = req.body;

    db.query(
        "UPDATE events SET title=?, description=?, event_date=?, venue=? WHERE id=?",
        [title, description, event_date, venue, id],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to update event" });
            }

            res.json({
                message: "Event Updated Successfully",
            });
        }
    );
};

// Delete event
const deleteEvent = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM events WHERE id=?",
        [id],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to delete event" });
            }

            res.json({
                message: "Event Deleted Successfully",
            });
        }
    );
};

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
};