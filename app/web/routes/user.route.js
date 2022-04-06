const express = require("express");
const router = express.Router();

// Validation payloads
const validate = require("express-validation");
const validationSchema = require("../../_validations/user.validation");

// DB Collection Model
const UserClass = require("../models/user.model");
const User = new UserClass();

/**
 * @TODO: Register User
 */
router.post("/register", validate(validationSchema.registerUser), User.registerUser);

//router.post("/register", User.registerUser);

/**
 * @TODO: Login User
 */
router.post("/login", validate(validationSchema.loginUser), User.loginUser);

module.exports = router;
