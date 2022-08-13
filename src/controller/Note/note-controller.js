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
    // Page number
    const page = parseInt(req.query.page) - 1 || 0;

    // Number of notes in a page
    const limit = 6;

    // Defining user id from user's request body
    const { userId } = req.params;

    let notes;

    // Return notes
    notes = await Note.find({ userId: userId })
      .skip(page * limit)
      .limit(limit);

    // Total number of docs
    const total = await Note.countDocuments();

    // Response
    const response = {
      total,
      page: page + 1,
      limit,
      notes,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
