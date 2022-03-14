const router = require('express').Router();
const {addAdmin, getAdmins, updateAdmin, deleteAdmin} = require('../controllers/admin.controller');

router.get("/all", getAdmins);
router.post("/register", addAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);

module.exports = router;