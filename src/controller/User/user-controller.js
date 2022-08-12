const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User login function
exports.login = async (req, res) => {
  // Check corresponding user for the given email address
  const user = await User.findOne({ email: req.body.email }).exec();

  if (user) {
    // Authenticating the user with the given password
    const isAuthenticated = await user.authenticate(req.body.password);

    // Check authentication status
    if (isAuthenticated) {
      // Create a token which expires after one day
      const token = jwt.sign(
        { _id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const {
        _id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status,
        accountType,
      } = user;

      // Response
      res.cookie("token", token, { expiresIn: "1d" });
      res.status(200).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          dateOfBirth,
          mobile,
          status,
          accountType,
        },
      });
    }

    // Password incorrect error
    else {
      return res.status(400).json({
        message: "Password is incorrent !!",
      });
    }
  }

  // Email incorrect error
  else {
    return res
      .status(400)
      .json({ message: "Check the email address and try again!" });
  }
};

// User profile update function
exports.updateProfile = (req, res) => {
  // Return user id from user's request param
  const { profileId } = req.params;

  if (profileId) {
    const saltRounds = 10;
    let pw;

    // Password hashing
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        pw = bcrypt.hash(req.body.password, salt);
        return pw;
      })
      .then((pass) => {
        User.findOneAndUpdate(
          { _id: profileId },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            mobile: req.body.mobile,
            status: req.body.status,
            password: pass,
          }
        ).exec((error, result) => {
          if (error) return res.status(400).json({ error });
          if (result) {
            res.status(202).json({ result });
          }
        });
      });

    // Update following fields in the user profile
  }
};
