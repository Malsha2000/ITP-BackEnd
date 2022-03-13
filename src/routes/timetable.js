const router = require("express").Router();
const { addTimetable, getTimetable } = require("../controllers/timetable.controller");



//define user routes
router.get("/all", getTimetable);
router.post("/add", addTimetable);

module.exports = router;