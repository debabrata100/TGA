const express = require("express");
const loginController = require("../controllers/loginController");
const { signupController } = require("../controllers/signupController");

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
module.exports = router;
