const router = require("express").Router();
const {
  addStudent,
  getStudents,
} = require("../controllers/student.controller");
const student = require("../model/StudentAccountModel");
const registerValidation = require("../validations/studentValidation");

router.get("/all", getStudents);
router.post("/register", addStudent);

module.exports = router;
