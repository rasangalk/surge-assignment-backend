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

// Note deletion function
exports.deleteNote = (req, res) => {
  // Return note id from user's request params
  const { noteId } = req.params;

  // Find the note using note id and delete
  Note.findOneAndDelete({ _id: noteId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Returning notes with pagination for a given user id
exports.getAllNotes = async (req, res) => {
  try {
    // Defining notes limit in a page and page number
    const { page = 1, limit = 5 } = req.query;

    // Defining user id from user's request body
    const { userId } = req.body;

    // Return notes
    const notes = await Note.find({ userId: userId })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.status(200).json({ total: notes.length, notes });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
