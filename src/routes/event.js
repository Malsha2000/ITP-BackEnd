const router = require("express").Router();
const {
    addEvent,
    getEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/event.controller");
const { addEvent, getEvent } = require("../controllers/event.controller");
const Event = require("../model/EventModel");

//define user routes
router.post("/add", addEvent);
router.get("/all", getEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
