const express = require("express");
const {
  createNote,
  updateNote,
} = require("../controller/Note/note-controller");
const router = express.Router();

// Note creation route
router.post("/note", createNote);

// Note update route
router.patch("/note/:noteId", updateNote);

module.exports = router;
