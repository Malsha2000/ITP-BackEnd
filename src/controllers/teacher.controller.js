const bcryptjs = require("bcryptjs");
const Teacher = require("../model/TeacherModel");
const { registerValidation } = require("../validations/teacherValidation");

const addTeacher = async (req,res) => {

    //validate the user input feilds
    const {error} = registerValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check user already exist
    const userExist = await Teacher.findOne({email:req.body.email});
    if(userExist) {
        return res.status(400).send({message: "User alredy exist"})
    }

    //hash the password
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        NIC: req.body.NIC,
        IDNumber: req.body.IDNumber,
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
    }
    catch(error) {
        res.status(400).send({message:error});
    }
}

const getTeachers = async (req,res) => {
    try{
        const teachers = await Teacher.find();
        res.send(teachers);
    }
    catch(error){
        res.status(400).send({message: error});
    }
}

module.exports = {
    addTeacher,
    getTeachers,
}