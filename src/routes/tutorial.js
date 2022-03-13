const router = require("express").Router();
const { addTutorial } = require("../controllers/tutorial.controller");
const Tutorial =require("../model/TutorialModels");
const tutorialValidation = require("../validations/tutorialValidation");

//define user routes
router.post("/add", addTutorial);

module.exports = router