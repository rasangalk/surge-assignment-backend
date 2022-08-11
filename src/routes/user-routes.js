const express = require("express");
const {
  createUser,
  getAllUsers,
} = require("../controller/Admin/admin-controller");
const { login, updateProfile } = require("../controller/User/user-controller");
const router = express.Router();

// User creation route
router.post("/user", createUser);

// Login route
router.post("/", login);

// User profile update route
router.patch("/user/:profileId", updateProfile);

// Users returning route
router.get("/users", getAllUsers);

module.exports = router;
