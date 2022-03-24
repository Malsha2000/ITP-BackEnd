const Tutorial = require("../model/TutorialModels");
const { tutorialValidation } = require("../validations/tutorialValidation");


//user tutorial function function
const addTutorial = async (req,res) => {

    const validate = localStorage.getItem("isTeacher");

    if(validate === "true"){

        //validate the user input fields
        const {error} = tutorialValidation(req.body);
        if(error){
            res.send({message:error['details'][0]['message']});
        }

        //to check user already exist
        const tutorialExist = await Tutorial.findOne({tutorialName: req.body.tutorialName});
        if(tutorialExist){
            return res.status(400).send({message: "Tutorial already exist"});
        }

        //assign data to the model
        const tutorial = new Tutorial({
            tutorialName: req.body.tutorialName,
            subject: req.body.subject,
            grade: req.body.subject,
            teacherName: req.body.teacherName,
            lessonName: req.body.lessonName,
            link: req.body.link,
        });

        try {
            //save the data in the database
            const saveTutorial = await tutorial.save();
            res.send(savedTutorial);
        }

        catch(error){ //error handling
            res.status(400).send({message:error});
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }
}; 

const getTutorial = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate == "true") {
        try {
            const tutorial = await Tutorial.find();
            res.send(tutorial);
        } catch (error) {
            res.status(400).send({ message: error });
        }
    }    
    else {
        return res.status(403).json("You do not have permission to access this");
    } 
};

const updateTutorial = async(req, res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate == "true") {


        const tutorialId = req.params.id;

        try {
            const tutorial = await Tutorial.findById(tutorialId);
            if(!tutorial){
                res.status(404).json("No Tutorial Found");
            }

            const {
                tutorialName,
                subject,
                grade,
                teacherName,
                lessonName,
                link,
            } = req.body;
            const updateTutorial = await Tutorial.findByIdAndUpdate(tutorialId,{
                tutorialName,
                subject,
                grade,
                teacherName,
                lessonName,
                link,
            });
            res.status(200).json(updateTutorial);
        } catch (err){
            res.status(400).send({ message: err});
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }    
};

const deletedTutorial = async (req, res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true") {
        const tutorialId = req.params.id;

        try {
            const tutorial = await Tutorial.findById(tutorialId);

            if(!tutorial) {
                res.status(404).json("Tutorial Not Found");
            }

            const deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId);
            res,staus(200).json(deletedTutorial);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }    
};


const getoneTutorial = async (req, res) => {
    const validateTeacher = localStorage.getItem("isTeacher");
    const validateStudent = localStorage.getItem("isStudent");

    if(validateTeacher === "true" || validateStudent === "true") {
        try {
            const tutorial = await Tutorial.findOne({_id: req.params.id});

            if (!tutorial) {
                res.status(404).json("Tutorial Not Found");
            }
            res.status(200).json(tutorial);
        } catch (err) {
            res.status(400).json(err.tutorial);
        }
    }
    else {
        return res.status(403).json("You do not have permission to access this");
    }    
};

module.exports = {
    addTutorial,
    getTutorial,
    updateTutorial, 
    deletedTutorial, 
    getoneTutorial,
}; //export functions