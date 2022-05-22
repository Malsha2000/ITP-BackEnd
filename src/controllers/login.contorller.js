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
        localStorage.setItem("isTeacher", false);
        localStorage.setItem("isStudent", false);
        console.log("Admin");
        console.log(localStorage.getItem("isAdmin"));

        //decrypt the password
        const passwordValidation = await bcryptjs.compare(req.body.password, adminExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong password"});
        }
        
        //generate json web token
        try{
            const token = await jwt.sign({_id: adminExist.id}, process.env.TOKEN_SECRET);
            res.header("authToken", token).send({
                'authToken':token,
                'role': 'admin',
                'roleData': adminExist
            });
        }
        catch(err) {
            res.status(400).send({message: err});
        }

    }
    
    else if(teacherExist) { //if user teacher
        localStorage.setItem("isTeacher", teacherExist.isTeacher);
        localStorage.setItem("teacherName", teacherExist.firstName);
        localStorage.setItem("subject", teacherExist.subject);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("isStudent", false);
        console.log("Teacher");
        console.log(localStorage.getItem("isTeacher"));

        //dcrypt password
        const passwordValidation = await bcryptjs.compare(req.body.password, teacherExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong password"});
        }

        //generate json web token
        try{
            const token = await jwt.sign({_id: teacherExist.id}, process.env.TOKEN_SECRET);
            res.header("authToken", token).send({
                "authToken":token,
                'role': 'teacher',
                'roleData': teacherExist
            });
        }
        catch(err) {
            res.status(400).send({message: err});
        }

    }
    else if(studentExist) { //if user student
        localStorage.setItem("isStudent", studentExist.isStudent);
        localStorage.setItem("studentName", studentExist.firstName);
        localStorage.setItem("studentId", studentExist.studentId);
        localStorage.setItem("teacherName", "Sasi");
        localStorage.setItem("subject", studentExist.subject);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("isTeacher", false);
        console.log("Student");
        console.log(localStorage.getItem("isStudent"));

        //dcrypt password
        const passwordValidation = await bcryptjs.compare(req.body.password, studentExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong Password"});
        }

        //generate json web token
        try{
            const token = await jwt.sign({_id: studentExist.id}, process.env.TOKEN_SECRET);
            res.header("authToken", token).send({
                "authToken":token,
                "role": "student",
                "roleData": studentExist
            });
        }
        catch(err) {
            res.status(400).send({message: err});
        }
    }
    else {
        try{
            return res.status(400).send({message: "User does not exist"});
        }
        catch(err) {
            return res.status(400).send({message: err});
        }
    }
};

let refreashTokens = [];

const logout = async (req,res) => {
    const refreashToken = req.params.authToken

    localStorage.clear();

    try {    
        refreashTokens = refreashTokens.filter((token) => token !== refreashToken);
        res.status(200).json("You are logged out successfully");
    }
    catch(err) {
        return res.status(400).send({message: err});
    }
}

module.exports = {login, logout};