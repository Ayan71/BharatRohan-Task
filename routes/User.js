const express = require("express");
const router = express.Router();

//import all requires contollers

const { register, login } = require("../controllers/Auth");

// Routes for Login, Resgister, and Authentication

// ********************************************************************************************************
//                                    Authentication routes
// ********************************************************************************************************

//Route for user register
router.post("/register", register);

//Route for user login
router.post("/login", login);

module.exports = router;
