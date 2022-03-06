const router = require("express").Router();
const {addExam, getExams} = require("../controllers/exam.controller");

router.post("/add", addExam);
router.get("/all", getExams);

module.exports = router;