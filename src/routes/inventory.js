const router = require("express").Router();
const { addInventory, getInventory } = require("../controllers/inventory.controller");

//define user routes
router.get("/all", getInventory);
router.post("/add", addInventory);

module.exports = router;