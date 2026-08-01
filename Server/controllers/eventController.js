const db = require("../config/db");

// ================= GET ALL EVENTS =================
const getAllEvents = (req, res) => {
    db.query("SELECT * FROM events", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch events"
            });
        }

        res.json(results);
    });
};

// ================= GET EVENT BY ID =================
const getEventById = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM events WHERE id=?",
        [id],
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to fetch event"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Event not found"
                });
            }

            res.json(results[0]);

        }
    );
};

// ================= ADD EVENT =================
const addEvent = (req, res) => {

    const {
        title,
        description,
        category,
        event_date,
        venue,
        organizer,
        capacity,
        image
    } = req.body;

    const created_by = req.user.id;

    db.query(
        `INSERT INTO events
        (title, description, category, event_date, venue,
         organizer, capacity, image, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description,
            category,
            event_date,
            venue,
            organizer,
            capacity,
            image,
            created_by
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to add event"
                });
            }

            res.status(201).json({
                message: "Event Added Successfully"
            });

        }
    );
};

// ================= UPDATE EVENT =================
const updateEvent = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        category,
        event_date,
        venue,
        organizer,
        capacity,
        image
    } = req.body;

    db.query(
        "SELECT created_by FROM events WHERE id=?",
        [id],
        (err, result) => {

            if (err)
                return res.status(500).json({
                    message: "Database Error"
                });

            if (result.length === 0)
                return res.status(404).json({
                    message: "Event Not Found"
                });

            if (
                req.user.role !== "admin" &&
                result[0].created_by !== req.user.id
            ) {
                return res.status(403).json({
                    message: "You can edit only your own events."
                });
            }

            db.query(
                `UPDATE events
                SET title=?,
                    description=?,
                    category=?,
                    event_date=?,
                    venue=?,
                    organizer=?,
                    capacity=?,
                    image=?
                WHERE id=?`,
                [
                    title,
                    description,
                    category,
                    event_date,
                    venue,
                    organizer,
                    capacity,
                    image,
                    id
                ],
                (err) => {

                    if (err)
                        return res.status(500).json({
                            message: "Failed to update event"
                        });

                    res.json({
                        message: "Event Updated Successfully"
                    });

                }
            );

        }
    );
};

// ================= DELETE EVENT =================
const deleteEvent = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT created_by FROM events WHERE id=?",
        [id],
        (err, result) => {

            if (err)
                return res.status(500).json({
                    message: "Database Error"
                });

            if (result.length === 0)
                return res.status(404).json({
                    message: "Event Not Found"
                });

            if (
                req.user.role !== "admin" &&
                result[0].created_by !== req.user.id
            ) {
                return res.status(403).json({
                    message: "You can delete only your own events."
                });
            }

            db.query(
                "DELETE FROM events WHERE id=?",
                [id],
                (err) => {

                    if (err)
                        return res.status(500).json({
                            message: "Failed to delete event"
                        });

                    res.json({
                        message: "Event Deleted Successfully"
                    });

                }
            );

        }
    );
};

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
};