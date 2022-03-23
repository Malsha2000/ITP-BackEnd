const router = require('express').Router();
const { addAdmin, 
        getAdmins, 
        updateAdmin, 
        deleteAdmin, 
        getoneAdmin,} = require('../controllers/admin.controller');

router.get("/all", getAdmins);
router.post("/register", addAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);
router.get("/:id", getoneAdmin);

module.exports = router;