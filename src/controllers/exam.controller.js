const Exam = require("../model/ExamModel");
const {registerValidation} = require("../validations/examValidation");

const addExam = async (req,res) => {
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
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

const getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.send(exams);
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

module.exports = {addExam, getExams};

