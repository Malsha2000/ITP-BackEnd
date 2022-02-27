const router = require('express').Router();
const {addTeacher, getTeachers} = require('../controllers/teacher.controller');
const Teacher = require("../model/TeacherModel");
const registerValidation = require("../validations/teacherValidation");

router.get("/all", getTeachers);
router.post("/register", addTeacher);

module.exports = router