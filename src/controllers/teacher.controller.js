const Teacher = require("../model/TeacherModel");

const addTeacher = (req,res) => {

    const teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        NIC: req.body.NIC,
        IDNumber: req.body.IDNumber,
        password: req.body.password,
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