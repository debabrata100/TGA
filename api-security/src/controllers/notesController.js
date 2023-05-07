const { Notes } = require("../db");

async function getNotes(req, res) {
  const allNotes = await Notes.findAll();
  res.status(200).json(allNotes);
}

async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    const newNote = await Notes.create({ title, description });
    res.status(201).json(newNote);
  } catch (e) {
    console.log(e); // write your logger here
    res.json({
      error: true,
      message: "Something went wrong",
    });
  }
}

async function deleteNote(req, res) {
  try {
    const { noteId } = req.params;
    await Notes.delete(noteId);
    res.status(204).end();
  } catch (e) {
    res
      .status(500)
      .json({ error: "Something went wrong, please cross check you request" });
  }
}

module.exports = { getNotes, createNote, deleteNote };
