const Result = require("../model/ResultModel");
const {resultValidation} = require("../validations/resultValidation");

const addResult = async (req,res) => {
    const { error } = resultValidation(req.body);
    if (error) {
    res.send({ message: error["details"][0]["message"] });
    }

  // to check redult already exist
    const resultExist = await Result.findOne({ studentId: req.body.studentId });
    if (resultExist) {
    return res.status(400).send({ message: "Result Already Exist" });
    }

    const result = new Result({
        examId: req.body.examId,
        examName: req.body.examName,
        studentName: req.body.studentName,
        studentId: req.body.studentId,
        marks: req.body.marks,
        subject: req.body.subject,
        grade: req.body.grade,
    });

    try {
        const savedResult = result.save();
        res.send(savedResult);
    } catch (error) {
        res.status(400).send({ message: error });
    }
}

const getResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.send(results);
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

module.exports = {addResult, getResults};