const router = require("express").Router();
const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getOneStudent,
} = require("../controllers/student.controller");

// define user routes
router.get("/all", getStudents);
router.post("/register", addStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/:id", getOneStudent);

module.exports = router;
