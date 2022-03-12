const router = require('express').Router();
const {addAdmin, getAdmins} = require('../controllers/admin.controller');

router.get("/all", getAdmins);
router.post("/register", addAdmin);

module.exports = router 