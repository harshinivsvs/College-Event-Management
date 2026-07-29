const express = require("express");
const router = express.Router();

const {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.post("/", addEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;