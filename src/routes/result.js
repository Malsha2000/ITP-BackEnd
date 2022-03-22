const router = require("express").Router();
const {
    addResult, 
    getResults,
    updateResult,
    deleteResult,
    getOneResult,
} = require("../controllers/result.controller");

router.post("/add", addResult);
router.get("/all", getResults);
router.put("/update/:id", updateResult);
router.delete("/delete/:id", deleteResult);
router.get("/:id", getOneResult);

module.exports = router;