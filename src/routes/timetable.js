const router = require("express").Router();
const { addTimetable,
        getTimetable,
        updateTimetable,
        deleteTimetable,
        getoneTimetable, } = require("../controllers/timetable.controller");



//define user routes
router.get("/all", getTimetable);
router.post("/add", addTimetable);
router.put("/update/:id", updateTimetable);
router.delete("/delete/:id", deleteTimetable);
router.get("/:id", getoneTimetable);


module.exports = router;