const bcryptjs = require("bcryptjs");
const Teacher = require("../model/TeacherModel");
const { registerValidation, loginValidation } = require("../validations/teacherValidation");

const addTeacher = async (req, res) => {
  //validate the user input feilds
  const { error } = registerValidation(req.body);
  if (error) {
    res.send({ message: error["details"][0]["message"] });
  }

  //to check user already exist
  const userExist = await Teacher.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send({ message: "User already exist" });
  }

  //hash the password
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(req.body.password, salt);

  const teacher = new Teacher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    NIC: req.body.NIC,
    username: req.body.username,
    password: hashPassword,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    higerQulification: req.body.higerQulification,
    subject: req.body.subject,
    medium: req.body.medium,
    experienceYear: req.body.experienceYear,
    classType: req.body.classType,
    imageUrl: req.body.imageUrl,
  });

  try {
    const savedTeacher = teacher.save();
    res.send(savedTeacher);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

//teacher login function
const teacherLogin = async (req,res) => {
  //validate the teacher input fields
  const {error} = loginValidation(req.body);
  if(error) {
      res.send({message:error['details'][0]['message']});
  }

  //check if teacher exist
  const teacherExist = await Teacher.findOne({username: req.body.username});
  if(!teacherExist) {
      return res.status(400).send({message: "Teacher does not exist"});
  }
  console.log(teacherExist);
  //decrypt the password
  const passwordValidation = await bcryptjs.compare(req.body.password, teacherExist.password);
  if(!passwordValidation) {
      return res.status(400).send({message: "Worng password"})
  }
  

  //generate json web token
  const token = jwt.sign({_id: Exist._id}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({'auth-token':token});

}

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

//Update teacher account
const updateTeacher = async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json("No Teacher Found");
    }

    const {
      firstName,
      lastName,
      NIC,
      username,
      password,
      address,
      phoneNumber,
      email,
      higerQulification,
      subject,
      medium,
      experienceYear,
      classType,
      imageUrl,


    } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, {
      firstName,
      lastName,
      NIC,
      username,
      password,
      address,
      phoneNumber,
      email,
      higerQulification,
      subject,
      medium,
      experienceYear,
      classType,
      imageUrl,
    });

    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

//delete
const deleteTeacher = async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      res.status(404).json("Event Not Found");
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    res.status(200).json(deletedTeacher);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  addTeacher,
  getTeachers,
  //teacherLogin,
  updateTeacher,
  deleteTeacher,
};
