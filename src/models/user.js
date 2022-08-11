const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    status: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Compare the password in the user's request and the hashed password in the DB
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

module.exports = mongoose.model("User", userSchema);
