const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addExam, 
    getExams, 
    updateExam, 
    deleteExam, 
    getOneExam
} = require("../controllers/exam.controller");

router.post("/add", verifyToken, addExam);
router.get("/all", verifyToken, getExams);
router.put("/update/:id", verifyToken, updateExam);
router.delete("/delete/:id", verifyToken, deleteExam);
router.get("/:id", verifyToken, getOneExam);

module.exports = router;