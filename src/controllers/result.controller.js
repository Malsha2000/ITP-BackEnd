const Result = require("../model/ResultModel");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const {resultValidation} = require("../validations/resultValidation");

const addResult = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");
    if(validate === "true"){

        const { error } = resultValidation(req.body.data);
        if (error) {
            return res.send({ message: error["details"][0]["message"] });
        }
        
        // to check result already exist
        const resultExist = await Result.findOne({ studentId: req.body.data.studentId, examName: req.body.data.examName });
        if (resultExist) {
            return res.status(400).send({ message: "Result Already Exist" });
        }
        console.log(req.body.data);
        const result = new Result({
            examName: req.body.data.examName,
            studentName: req.body.data.studentName,
            studentId: req.body.data.studentId,
            marks: req.body.data.marks,
            subject: localStorage.getItem("subject"),
            teacherName: localStorage.getItem("teacherName"),
        });
        console.log(result);
        try {
            console.log("success");
            const savedResult = result.save();
            return res.send(savedResult);
        } catch (err) {
            return res.status(400).send({ message: err });
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
}

const getResults = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");
    const validateStudent = localStorage.getItem("isStudent");
    if(validate === "true" || validateStudent === "true") {
        let examName = req.query.examName;
        console.log("get results " + examName);
        try {
            const results = await Result.find({teacherName: localStorage.getItem("teacherName"), examName: examName});
            res.send(results);
            console.log(results);
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
        console.log(resultId);
        
        try {
            console.log("ok");
            const result = await Result.findById(resultId);
            console.log("great");
            if(!result) {
                res.status(404).json("No Result Found");
            }
            
            const {
                studentId,
                studentName,
                marks,
                examName,
            } = req.body.data;

            console.log(studentId, studentName, marks, examName);

            const subject = localStorage.getItem("subject");
            const teacherName = localStorage.getItem("teacherName");
            
            const updatedResult = await Result.findByIdAndUpdate(resultId, {
                examName,
                studentName,
                studentId,
                marks,
                subject,
                teacherName,
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