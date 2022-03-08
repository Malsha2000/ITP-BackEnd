const router = require("express").Router();
const { addTutorial, getTutorial} = require("../controllers/tutorial.controller");
const Tutorial =require("../model/TutorialModels");
const tutorialValidation = require("../validations/tutorialValidation");

//define user routes
router.post("/add", addTutorial);
router.get("/all", getTutorial);

module.exports = router