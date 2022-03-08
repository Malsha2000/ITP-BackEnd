const router = require("express").Router();
const { addEvent, getEvent } = require("../controllers/event.controller");
const Event = require("../model/EventModel");

//define user routes
router.post("/add", addEvent);
router.get("/all", getEvent);

module.exports = router;
