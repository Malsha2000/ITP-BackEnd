const router = require('express').Router();
const {addTeacher, getTeachers} = require('../controllers/teacher.controller');
const Teacher = require("../model/TeacherModel");
const registerValidation = require("../validations/teacherValidation");

router.get("/all", getTeachers);
router.post("/register", addTeacher);

// router.post("/register", async (req,res) => {

//     //validation to check user input
//     // const {error} = registerValidation(req.body);
//     // if(error) {
//     //     res.status(400).send({message:error['details'][0]['message']});
//     // }


module.exports = router