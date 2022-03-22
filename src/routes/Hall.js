const router = require("express").Router();
const{
    addHall,
    getHall,
    updateHall,
    deleteHall,
    getoneHall,
     } = require("../controllers/Hall.controller");



//define user routes

router.post("/add",addHall);
router.get("/all",getHall);
router.put("/update/:id",updateHall);
router.delete("/delete/:id",deleteHall);
router.get("/:id",getoneHall);

module.exports = router;

