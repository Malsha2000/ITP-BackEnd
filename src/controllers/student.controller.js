const bcryptjs = require("bcryptjs");
const Student = require("../model/StudentAccountModel");
const { registerValidation } = require("../validations/studentValidation");

const addStudent = async (req, res) => {
  // validate user input fields
  const { error } = registerValidation(req.body);
  if (error) {
    res.send({ message: error["details"][0]["message"] });
  }

  // to check user already exist
  const userExist = await Student.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send({ message: "User Already Exist" });
  }

  //hash the password
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(req.body.password, salt);

  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    NIC: req.body.NIC,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    school: req.body.school,
    grade: req.body.grade,
    medium: req.body.medium,
    parentName: req.body.parentName,
    parentPhoneNumber: req.body.parentPhoneNumber,
    parentEmail: req.body.parentEmail,
    studentGender: req.body.studentGender,
    parentAddress: req.body.parentAddress,
    parentOccupation: req.body.parentOccupation,
    imageURL: req.body.imageURL,
    subject: req.body.subject,
    teacher: req.body.teacher,
    OL_Year: req.body.OL_Year,
    AL_Year: req.body.AL_Year,
    username: req.body.username,
    password: hashPassword,
  });

  try {
    const savedStudent = student.save();
    res.send(savedStudent);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = {
  addStudent,
  getStudents,
};
