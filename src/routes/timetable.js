const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const { addTimetable,
        getTimetable,
        updateTimetable,
        deleteTimetable,
        getoneTimetable, } = require("../controllers/timetable.controller");



//define user routes
router.get("/all", verifyToken, getTimetable);
router.post("/add", verifyToken, addTimetable);
router.put("/update/:id", verifyToken, updateTimetable);
router.delete("/delete/:id", verifyToken, deleteTimetable);
router.get("/:id", verifyToken, getoneTimetable);


module.exports = router;