const router = require("express").Router();
const { addTimetable, getTimetable } = require("../controllers/timetable.controller");
const Timetable = require("../model/TimetableModels");
const timetableValidation = require("../validations/timetableValidation");


//define user routes
router.get("/all", getTimetable);
router.post("/add", addTimetable);

module.exports = router;