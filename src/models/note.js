const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Note schema
const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      min: 5,
      max: 50,
    },
    description: {
      type: String,
      min: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
