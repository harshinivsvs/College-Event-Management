const express = require("express");
const router = express.Router();

const {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const {
    verifyToken,
    authorizeRole
} = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// Everyone can view events
router.get("/", getAllEvents);

// Everyone can view a single event
router.get("/:id", getEventById);

// ================= PROTECTED ROUTES =================

// Only Admin and Organizer can create events
router.post(
    "/",
    verifyToken,
    authorizeRole("admin", "organizer"),
    addEvent
);

// Only Admin and Organizer can update events
router.put(
    "/:id",
    verifyToken,
    authorizeRole("admin", "organizer"),
    updateEvent
);

// Only Admin and Organizer can delete events
router.delete(
    "/:id",
    verifyToken,
    authorizeRole("admin", "organizer"),
    deleteEvent
);

module.exports = router;