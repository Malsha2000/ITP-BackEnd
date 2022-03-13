const router = require("express").Router();
const { addTutorial, getTutorial} = require("../controllers/tutorial.controller");



//define user routes
router.post("/add", addTutorial);
router.get("/all", getTutorial);

module.exports = router