const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {login, logout} = require("../controllers/login.contorller.js");

router.post("/", login);
router.post("/logout", verifyToken, logout);

module.exports = router;