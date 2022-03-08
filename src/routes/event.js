const router = require("express").Router();
const { addEvent } = require("../controllers/event.controller");
const Event = require("../model/EventModel");
const registerValidation = require("../validations/eventValidation");


//define user routes
router.post("/register", addEvent);

module.exports = router