const express = require("express");
const { loginUser, refreshProfile } = require("../controllers/loginController");
const logoutUser = require("../controllers/logoutUser");
const { signupController } = require("../controllers/signupController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupController);
router.post("/refresh-profile", refreshProfile);
module.exports = router;
