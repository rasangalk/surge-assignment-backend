const express = require("express");
const { createUser } = require("../controller/Admin/admin-controller");
const { login } = require("../controller/User/user-controller");
const router = express.Router();

// User creation route
router.post("/user", createUser);

// Login route
router.post("/", login);
module.exports = router;
