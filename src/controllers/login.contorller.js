const Admin = require("../model/SystemAdminModel");
const Teacher = require("../model/TeacherModel");
const Student = require("../model/StudentAccountModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const {loginValidation} = require("../validations/loginValidation");

const login = async (req,res,next) => {
    const {error} = loginValidation(req.body);

    if(error) {
        res.send({message: error["details"][0]["message"]});
    }

    const adminExist = await Admin.findOne({username: req.body.username});
    const teacherExist = await Teacher.findOne({username: req.body.username});
    const studentExist = await Student.findOne({username: req.body.username});
    
    //if user is an admin
    if(adminExist) {
        localStorage.setItem("isAdmin", adminExist.isAdmin);
        console.log("Admin");
        console.log(localStorage.getItem("isAdmin"));

        //decrypt the password
        const passwordValidation = await bcryptjs.compare(req.body.password, adminExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong password"});
        }
        
        //generate json web token
        const token = jwt.sign({_id: adminExist.id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send({'auth-token':token});

    }
    
    else if(teacherExist) { //if user teacher
        localStorage.setItem("isTeacher", teacherExist.isTeacher);
        console.log("Teacher");
        console.log(localStorage.getItem("isTeacher"));

        //dcrypt password
        const passwordValidation = await bcryptjs.compare(req.body.password, teacherExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong password"});
        }

        //generate json web token
        const token = jwt.sign({_id: teacherExist.id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send({"auth-token":token});

    }
    else if(studentExist) { //if user student
        localStorage.setItem("isStudent", studentExist.isStudent);
        console.log("Student");
        console.log(localStorage.getItem("isStudent"));

        //dcrypt password
        const passwordValidation = await bcryptjs.compare(req.body.password, studentExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong Password"});
        }

        //generate json web token
        const token = jwt.sign({_id: studentExist.id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send({"auth-token":token});
    }
    else {
        return res.status(400).send({message: "User does not exist"});
    }
}

module.exports = {login};