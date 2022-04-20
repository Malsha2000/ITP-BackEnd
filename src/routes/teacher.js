const router = require('express').Router();
const {addTeacher, getTeachers, updateTeacher,deleteTeacher} = require('../controllers/teacher.controller');

router.get("/all", getTeachers);
router.post("/register", addTeacher);
router.put("/update/:id", updateTeacher);
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
