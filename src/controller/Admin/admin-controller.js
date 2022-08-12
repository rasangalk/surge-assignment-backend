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

// Users pagination and search
exports.UserPagination = async (req, res) => {
  try {
    // Page number
    const page = parseInt(req.query.page) - 1 || 0;

    // Number of users in a page
    const limit = parseInt(req.query.limit) || 5;

    // Fist name
    const first = req.query.first;

    // Last name
    const second = req.query.second;

    // Email
    const email = req.query.email;

    let users;

    // Search by first name
    if (first != null) {
      users = await User.find({
        firstName: { $regex: first, $options: "i" },
      })
        .skip(page * limit)
        .limit(limit);
    }
    // Search by last name
    else if (second != null) {
      users = await User.find({
        lastName: { $regex: second, $options: "i" },
      })
        .skip(page * limit)
        .limit(limit);
    }
    // Search by email
    else if (email != null) {
      users = await User.find({
        email: { $regex: email, $options: "i" },
      })
        .skip(page * limit)
        .limit(limit);
    }

    // Without filtering
    else {
      users = await User.find()
        .skip(page * limit)
        .limit(limit);
    }

    // Total number of documents in user collection
    const total = await User.countDocuments();

    // Response
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      users,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// User select
exports.UserSelect = async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    User.findOne({ _id: userId }).exec((error, details) => {
      if (error) return res.status(400).json({ error });
      if (details) {
        res.status(201).json({ details });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
