const express = require("express");
const {
  getRoles,
  createNewRole,
  createUserRole,
  updateUserRole,
  getUserRoles,
} = require("../controllers/rolesController");
const authMiddleWare = require("../middlewares/authMiddleware");
const { createRoles } = require("../middlewares/rolesMiddleware");

const router = express.Router();

router.get("/", authMiddleWare, createRoles, getRoles);
router.post("/create", authMiddleWare, createRoles, createNewRole);
router.get("/user", authMiddleWare, createRoles, getUserRoles);
router.post("/user/create", authMiddleWare, createRoles, createUserRole);
router.post("/user/update", authMiddleWare, createRoles, updateUserRole);
module.exports = router;
