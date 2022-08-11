const express = require("express");
const {
  createNote,
  updateNote,
  deleteNote,
} = require("../controller/Note/note-controller");
const router = express.Router();

// Note creation route
router.post("/note", createNote);

// Note update route
router.patch("/note/:noteId", updateNote);

// Note delete route
router.delete("/note/:noteId", deleteNote);

module.exports = router;
