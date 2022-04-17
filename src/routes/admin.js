const router = require('express').Router();
const verifyToken = require("../verifyToken/verifyToken");
const { addAdmin, 
        getAdmins, 
        updateAdmin, 
        deleteAdmin, 
        getoneAdmin,} = require('../controllers/admin.controller');

router.get("/all", verifyToken, getAdmins);
router.post("/register", verifyToken, addAdmin);
router.put("/update/:id", verifyToken, updateAdmin);
router.delete("/delete/:id", verifyToken, deleteAdmin);
router.get("/:id", verifyToken, getoneAdmin);

module.exports = router;