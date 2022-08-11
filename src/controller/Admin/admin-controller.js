const User = require("../../models/user");
const bcrypt = require("bcrypt");

// User creation function
exports.createUser = async (req, res) => {
  // Check corresponding user for the given email address
  User.findOne({ email: req.body.email }).exec(async (error, _user) => {
    if (_user)
      // Existing email address error
      return res.status(400).json({
        message: "Email is already registered",
      });

    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      mobile,
      status,
      accountType,
    } = req.body;

    const saltRounds = 10;

    // Password hashing
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt);
      })

      // Store hashed password and email in user object
      .then((password) => {
        const user = new User({
          firstName,
          lastName,
          email,
          dateOfBirth,
          mobile,
          status,
          password,
          accountType,
        });

        // Send user object to the DB
        user.save((error, user_) => {
          if (error) return res.status(400).json({ error });
          if (user_) {
            res.status(201).json({ user_ });
          }
        });
      });
  });
};

// Returning users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    // Defining users limit in a page and page number

    const { page = 1, limit = 10 } = req.query;

    // Return notes

    const users = await User.find()

      .limit(limit * 1)

      .skip((page - 1) * limit);

    res.status(200).json({ total: users.length, users });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
