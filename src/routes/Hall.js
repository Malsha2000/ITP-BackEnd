const router = require("express").Router();
const{addHall,getHall} = require("../controllers/Hall.controller");
const Event = require("../model/HallModel");


//define user routes

router.post("/add",addHall);
router.get("/all",getHall);

module.exports = router;