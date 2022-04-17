const router = require('express').Router();
const {addRequest, getRequest, updateRequest, deleteRequest, getoneRequest} = require('../controllers/request.controller');

router.get("/all", getRequest);
router.post("/register", addRequest);
router.put("/update/:id", updateRequest);
router.delete("/delete/:id", deleteRequest);
router.get("/:id", getoneRequest);

module.exports = router;