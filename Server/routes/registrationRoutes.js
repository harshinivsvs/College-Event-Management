const express = require("express");
const router = express.Router();

const {
  registerEvent,
  getRegisteredEvents,
} = require("../controllers/registrationController");

router.get("/test", (req, res) => {
  res.send("Registration route is working!");
});

router.post("/", registerEvent);
router.get("/:userId", getRegisteredEvents);

module.exports = router;