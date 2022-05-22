const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const Tutorial = require("../model/TutorialModels");
const { tutorialValidation } = require("../validations/tutorialValidation");

//user tutorial function function
const addTutorial = async (req,res) => {
    const validate = localStorage.getItem("isTeacher");

    if(validate === "true"){

        //validate the user input fields
        const {error} = tutorialValidation(req.body.data);
        if(error){
            return res.send({message:error['details'][0]['message']});
        }

        //to check user already exist
        console.log(req.body.data);
        const tutorialExist = await Tutorial.findOne({tutorialName: req.body.data.tutorialName});
        if(tutorialExist){
            return res.status(400).send({message: "Tutorial already exist"});
        }

        //assign data to the model
        console.log("log");
        const tutorial = new Tutorial({
            tutorialName: req.body.data.tutorialName,
            subject: localStorage.getItem("subject"),
            grade: req.body.data.subject,
            teacherName: localStorage.getItem("teacherName"),
            lessonName: req.body.data.lessonName,
            link: req.body.data.link,
        });

        console.log(tutorial);

        try {
            //save the data in the database
            console.log("success");
            const saveTutorial = tutorial.save();
            return res.send(savedTutorial);
        }
        catch(err){ //error handling
            return res.status(400).send({message:err});
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
            } = req.body.data;
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