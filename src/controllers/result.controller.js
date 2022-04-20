const Result = require("../model/ResultModel");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const {resultValidation} = require("../validations/resultValidation");

const addResult = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");
    if(validate === "true"){

        const { error } = resultValidation(req.body);
        if (error) {
            res.send({ message: error["details"][0]["message"] });
        }
        
        // to check redult already exist
        const resultExist = await Result.findOne({ studentId: req.body.studentId, examName: req.body.examName });
        if (resultExist) {
            return res.status(400).send({ message: "Result Already Exist" });
        }
        
        const result = new Result({
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
    else {
        return res.status(403).json("You do not have permission to access this");
    }
}

const getResults = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");
    if(validate === "true") {

        try {
            const results = await Result.find();
            res.send(results);
        } catch (error) {
            res.status(400).send({ message: error });
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const updateResult = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");
    if(validate === "true") {

        const resultId = req.params.id;
        
        try {
            const result = await Result.findById(resultId);
            if(!result) {
                res.status(404).json("No Result Found");
            }
            
            const {
                examName,
                studentName,
                studentId,
                marks,
                subject,
                grade,
            } = req.body;
            
            const updatedResult = await Result.findByIdAndUpdate(resultId, {
                examName,
                studentName,
                studentId,
                marks,
                subject,
                grade,
            });
            
            res.status(200).json(updatedResult);
        }
        catch (err) {
            res.status(400).send({message: err});
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const deleteResult = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");
    if(validate) {

        const resultId = req.params.id;
        
        try {
            const result = await Result.findById(resultId);
            if(!result) {
                res.status(404).json("Result Not Found");
            }
            
            const deleletedResult = await Result.findByIdAndDelete(resultId);
            res.status(200).json(deleletedResult);
        }
        catch(err) {
            res.status(400).json(err.message);
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
};

const getOneResult = async (req,res) => {
    const validateTeacher = localStorage.getItem("isTeacher");
    const validateStudent = localStorage.getItem("isStudent");
    if(validateTeacher === "true" || validateStudent === "true") {

        const resultId = req.params.id;
        
        try {
            const result = await Result.findOne({_id: resultId});
            if(!result) {
                res.status(404).json("Result Not Found");
            }
            res.status(404).json(result);
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
    addResult, 
    getResults,
    updateResult,
    deleteResult,
    getOneResult,
};