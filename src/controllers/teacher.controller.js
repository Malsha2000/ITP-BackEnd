const bcryptjs = require("bcryptjs");
const Teacher = require("../model/TeacherModel");
const { registerValidation} = require("../validations/teacherValidation");

const addTeacher = async (req, res) => {
  //validate the user input feilds
  const validateAdmin = localStorage.getItem("isAdmin");
    

    if(validateAdmin === "true"){
      console.log("validation Ok");
     const { error } = registerValidation(req.body.data);
  if (error) {
    res.send({ message: error["details"][0]["message"] });
    console.log("Msg error ok");
  }
  console.log(req.body.data);
  //to check user already exist
  const teacherExist = await Teacher.findOne({ email: req.body.data.email });
  if (teacherExist) {
    return res.status(400).send({ message: "User already exist" });
  }
    


  console.log("ok");
  const teacher = new Teacher({
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    NIC: req.body.data.NIC,
    gender:req.body.data.gender,
    phoneNumber: req.body.data.phoneNumber,
    email: req.body.data.email,
    subject: req.body.data.subject,
    grade: req.body.data.grade,
    medium: req.body.data.medium,
    classType: req.body.data.classType,
    experienceYear: req.body.data.experienceYear,
    username: req.body.data.username,
    password: req.body.data.hashPassword,
    address: req.body.data.address,
    higerQulification: req.body.data.higerQulification,
    // birthday: req.body.data.birthday,
    //imageUrl: req.body.data.imageUrl,
    //medium: req.body.data.medium,
    // experienceYear: req.body.data.experienceYear,
    //classType: req.body.data.classType,
    
  });
  console.log(teacher);
  try {
    console.log("success");
    const savedTeacher = teacher.save();
    return res.send(savedTeacher);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

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
  const validateAdmin = localStorage.getItem("isAdmin");
    const validateTeacher = localStorage.getItem("isTeacher");

    if(validateAdmin === "true" || validateTeacher === "true") {
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
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

//delete
const deleteTeacher = async (req, res) => {
  const validateAdmin = localStorage.getItem("isAdmin");
  
    if(validateAdmin === "true") {
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
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

const getoneTeacher = async (req, res) => {
  const validateAdmin = localStorage.getItem("isAdmin");
    const validateTeacher = localStorage.getItem("isTeacher");

    if(validateTeacher === "true" || validateAdmin === "true") {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id });

    if (!teacher) {
      res.status(404).json("Teacher Not Found");
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
else {
    return res.status(403).json("You do not have permission to access this");
}
};

module.exports = {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
  getoneTeacher,
};
