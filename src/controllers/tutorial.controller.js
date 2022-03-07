const bcryptps = require("bcryptjs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const Tutorial = require("../model/TutorialModels");
const { tutorialValidation } = require("../validations/tutorialValidation");


//user tutorial function function
const addTutorial = async (req,res) => {

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

module.exports = {addTutorial}; //export functions