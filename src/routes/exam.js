const router = require("express").Router();
const {
    addExam, 
    getExams, 
    updateExam, 
    deleteExam, 
    getOneExam
} = require("../controllers/exam.controller");

router.post("/add", addExam);
router.get("/all", getExams);
router.put("/update/:id", updateExam);
router.delete("/delete/:id", deleteExam);
router.get("/:id", getOneExam);

module.exports = router;