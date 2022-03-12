const router = require("express").Router();
const {addResult, getResults} = require("../controllers/result.controller");

router.post("/add", addResult);
router.get("/all", getResults);

module.exports = router;