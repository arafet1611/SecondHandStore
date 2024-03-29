const express = require("express");
const router = express.Router();
const upload = require("../multer");
const userController = require("../controllers/userController");

// Register a new user
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUser);
module.exports = router;
