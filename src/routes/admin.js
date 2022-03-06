const router = require('express').Router();
const {addAdmin, getAdmins} = require('../controllers/admin.controller');
const Admin = require("../model/SystemAdminModel");
const registerValidation = require("../validations/adminValidation");

router.get("/all", getAdmins);
router.post("/register", addAdmin);

module.exports = router