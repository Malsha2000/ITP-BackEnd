const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const { addInventory,
        getInventory,
        updateInventory,
        deleteInventory, 
        getoneInventory, } = require("../controllers/inventory.controller");

//define user routes
router.get("/all", verifyToken, getInventory);
router.post("/add", verifyToken, addInventory);
router.put("/update/:id", verifyToken, updateInventory);
router.delete("/delete/:id", verifyToken, deleteInventory);
router.get("/:id", verifyToken, getoneInventory);

module.exports = router;