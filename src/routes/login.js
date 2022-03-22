const router = require("express").Router();
const {login} = require("../controllers/login.contorller.js");

router.post("/", login);

module.exports = router;