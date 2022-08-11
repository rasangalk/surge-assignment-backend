const express = require("express");
const {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("../controller/Note/note-controller");
const router = express.Router();

// Note creation route
router.post("/note", createNote);

// Note update route
router.patch("/note/:noteId", updateNote);

// Note delete route
router.delete("/note/:noteId", deleteNote);

// Notes returning route
router.get("/note", getAllNotes);

module.exports = router;
