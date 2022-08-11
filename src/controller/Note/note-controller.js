const Note = require("../../models/note");

// Note creation function
exports.createNote = (req, res) => {
  const { userId, title, description } = req.body;

  // Creating a note object from note model and assign request body values
  const note = new Note({
    userId,
    title,
    description,
  });

  // Save note in the DB
  note.save((error, note) => {
    if (error) return res.status(400).json({ error });
    if (note) {
      res.status(201).json({ note });
    }
  });
};
