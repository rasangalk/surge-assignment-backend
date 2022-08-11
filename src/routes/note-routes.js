const express = require("express");
const { createNote } = require("../controller/Note/note-controller");
const router = express.Router();

// Note creation route
router.post("/note", createNote);

module.exports = router;
