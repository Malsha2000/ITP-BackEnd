const router = require("express").Router();
const { addInventory,
        getInventory,
        updateInventory,
        deleteInventory, 
        getoneInventory, } = require("../controllers/inventory.controller");

//define user routes
router.get("/all", getInventory);
router.post("/add", addInventory);
router.put("/update/:id", updateInventory);
router.delete("/delete/:id", deleteInventory);
router.get("/:id", getoneInventory);

module.exports = router;