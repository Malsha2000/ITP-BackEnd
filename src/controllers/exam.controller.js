const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const Exam = require("../model/ExamModel");
const {registerValidation} = require("../validations/examValidation");

const addExam = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true"){
        const {error} = registerValidation(req.body.data);
        console.log({error});
        if (error) {
            return res.send({ message: error["details"][0]["message"] });
        }
        console.log("teacher be log", req.body.data);
        const examExist = await Exam.findOne({ examName: req.body.data.examName });
        if (examExist) {
            return res.status(400).send({ message: "Exam Already Exist" });
        }

        console.log("ok");
        const exam = new Exam({
            examName: req.body.data.examName,
            description: req.body.data.description,
            subject: localStorage.getItem("subject"),
            teacherName: localStorage.getItem("teacherName"),
            date: req.body.data.date,
            time: req.body.data.time,
            duration: req.body.data.duration,
        });
        console.log(exam);
        try {
            console.log("success");
            const savedExam = exam.save();
            return res.send(savedExam);
        } catch (err) {
            return res.status(400).send({ message: err });
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const getExams = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");
    const studentValidate = localStorage.getItem("isStudent")

    if(validate === "true" || studentValidate === "true") {
        try {
            const exams = await Exam.find({teacherName: localStorage.getItem("teacherName")});
            res.send(exams);
        } catch (error) {
            res.status(400).send({ message: error });
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const updateExam = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true") {

        const examId = req.params.id;    
        try {
            const exam = await Exam.findById(examId);
            if(!exam) {
                res.status(404).json("No Exam Found");
            }    
            const {
                examName,
                description, 
                date, 
                time, 
                duration,
            } = req.body.data;

            const subject = localStorage.getItem("subject");
            const teacherName = localStorage.getItem("teacherName");

            const updatedExam = await Exam.findByIdAndUpdate(examId, { 
                examName,
                description, 
                subject, 
                teacherName, 
                date, 
                time, 
                duration
            });
            
            res.status(200).json(updatedExam);
        }
        catch (err) {
            res.status(400).send({message: err});
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const deleteExam = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true") {

        const examId = req.params.id;
        
        try {
            const exam = await Exam.findById(examId);
            if(!exam) {
                res.status(404).json("Exam Not Found");
            }
            
            const deletedExam = await Exam.findByIdAndDelete(examId);
            res.status(200).json(deletedExam);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const getOneExam = async (req,res) => {
    const validateTeacher = localStorage.getItem("isStudent");
    const validateStudent = localStorage.getItem("isStudent");

    if(validateTeacher === "true" || validateStudent === "true") {

        try {
            const exam = await Exam.findOne({ _id: req.params.id});
            if(!exam) {
                res.status(404).json("Exam Not Found");
            }
            res.status(200).json(exam);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

module.exports = {
    addExam, 
    getExams,
    updateExam,
    deleteExam,
    getOneExam,
};

