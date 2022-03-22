const router = require("express").Router();
const {
    addTutorial,
    getTutorial,
    updateTutorial,
    deletedTutorial,
    getoneTutorial,
} = require("../controllers/tutorial.controller");
const Tutorial = require("../model/TutorialModels");


//define user routes
router.post("/add", addTutorial);
router.get("/all", getTutorial);
router.put("/update/:id", updateTutorial);
router.delete("/delete/:id", deletedTutorial);
router.get("/:id", getoneTutorial);

module.exports = router