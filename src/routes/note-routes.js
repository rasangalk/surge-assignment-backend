const express = require("express");
const {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  NoteSelect,
} = require("../controller/Note/note-controller");
const router = express.Router();

// Note creation route
router.post("/note", createNote);

// Note update route
router.patch("/note/:noteId", updateNote);

// Note delete route
router.delete("/note/:noteId", deleteNote);

// Notes returning route
router.get("/note/:userId", getAllNotes);

// Return selected note route
router.get("/select-note/:noteId", NoteSelect);

module.exports = router;
