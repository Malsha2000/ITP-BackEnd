const router = require("express").Router();
const { addTimetable, getTimetable, updateTimetable, deleteTimetable } = require("../controllers/timetable.controller");



//define user routes
router.get("/all", getTimetable);
router.post("/add", addTimetable);
router.put("/update/:id", updateTimetable);
router.delete("/delete/:id", deleteTimetable);


module.exports = router;