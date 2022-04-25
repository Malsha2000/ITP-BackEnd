const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addTutorial,
    getTutorial,
    updateTutorial,
    deletedTutorial,
    getoneTutorial,
} = require("../controllers/tutorial.controller");
const Tutorial = require("../model/TutorialModels");


//define user routes
router.post("/add", verifyToken, addTutorial);
router.get("/all", verifyToken, getTutorial);
router.put("/update/:id", verifyToken, updateTutorial);
router.delete("/delete/:id", verifyToken, deletedTutorial);
router.get("/:id", verifyToken, getoneTutorial);

module.exports = router