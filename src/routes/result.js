const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addResult, 
    getResults,
    updateResult,
    deleteResult,
    getOneResult,
} = require("../controllers/result.controller");

router.post("/add", verifyToken, addResult);
router.get("/all", verifyToken, getResults);
router.put("/update/:id", verifyToken, updateResult);
router.delete("/delete/:id", verifyToken, deleteResult);
router.get("/:id", verifyToken, getOneResult);

module.exports = router;