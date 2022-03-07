const router = require("express").Router();
const {addStudent, getStudents} = require("../controllers/student.controller");

router.get("/all", getStudents);
router.post("/register", addStudent);

module.exports = router;
