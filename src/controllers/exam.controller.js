const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const Exam = require("../model/ExamModel");
const {registerValidation} = require("../validations/examValidation");

const addExam = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true"){

        const {error} = registerValidation(req.body);
        if (error) {
            res.send({ message: error["details"][0]["message"] });
        }

        const examExist = await Exam.findOne({ examName: req.body.examName });
        if (examExist) {
            return res.status(400).send({ message: "Exam Already Exist" });
        }
        
        const exam = new Exam({
            examName: req.body.examName,
            description: req.body.description,
            subject: req.body.subject,
            grade: req.body.grade,
            teacherName: req.body.teacherName,
            date: req.body.date,
            time: req.body.time,
            duration: req.body.duration,
        });

        try {
            const savedExam = exam.save();
            res.send(savedExam);
        } catch (err) {
            res.status(400).send({ message: err });
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const getExams = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate == "true") {
        try {
            const exams = await Exam.find();
            console.log("student login");
            console.log(localStorage.getItem("isStudent"));
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
                subject, 
                grade, 
                teacherName, 
                date, 
                time, 
                duration,
            } = req.body;

            const updatedExam = await Exam.findByIdAndUpdate(examId, { 
                examName,
                description, 
                subject, 
                grade, 
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

