const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getoneEvent,
} = require("../controllers/event.controller");
const Event = require("../model/EventModel");

//define user routes
router.post("/add", verifyToken, addEvent);
router.get("/all", getEvent);
router.put("/update/:id", verifyToken, updateEvent);
router.delete("/delete/:id", verifyToken, deleteEvent);
router.get("/:id", getoneEvent);

module.exports = router;
