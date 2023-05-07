const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/notesController");
const authMiddleWare = require("../middlewares/authMiddleware");
const {
  createNoteRoleCheck,
  deleteNoteRoleCheck,
} = require("../middlewares/rolesMiddleware");
const { validateCreateNoteFields } = require("../middlewares/validateFields");

const router = express.Router();

router.get("/", authMiddleWare, getNotes);
router.post(
  "/create",
  authMiddleWare, // middleware to check user is authenticated using jwt token
  validateCreateNoteFields, // middleware to check valid input fields
  createNoteRoleCheck, // middleware to check role based access control
  createNote
);
router.delete("/:noteId", authMiddleWare, deleteNoteRoleCheck, deleteNote);

module.exports = router;
