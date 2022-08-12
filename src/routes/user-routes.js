const express = require("express");
const {
  createUser,
  getAllUsers,
  UserPagination,
} = require("../controller/Admin/admin-controller");
const { login, updateProfile } = require("../controller/User/user-controller");
const router = express.Router();

// User creation route
router.post("/user", createUser);

// Login route
router.post("/", login);

// User profile update route
router.patch("/user/:profileId", updateProfile);

// Users pagination and search
router.get("/users", UserPagination);

module.exports = router;
