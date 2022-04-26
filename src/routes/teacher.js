const router = require('express').Router();
const verifyToken = require("../verifyToken/verifyToken");
const {addTeacher, getTeachers, updateTeacher,deleteTeacher, getoneTeacher} = require('../controllers/teacher.controller');

router.get("/all", getTeachers);
router.post("/register", verifyToken,addTeacher);
router.put("/update/:id", verifyToken,updateTeacher);
router.delete("/delete/:id", verifyToken,deleteTeacher);
router.get("/:id",verifyToken,getoneTeacher);

module.exports = router;
