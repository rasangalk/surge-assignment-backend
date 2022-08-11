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

// Note update function
exports.updateNote = (req, res) => {
  // Return note id from user's request param
  const { noteId } = req.params;

  if (noteId) {
    // Update following fields in the note
    Note.findOneAndUpdate(
      { _id: noteId },
      {
        title: req.body.title,
        description: req.body.description,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
