const bcrypt = require("bcrypt");
const User = require("../models/User"); // Import your User model
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    if (!userName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match. Please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login to continue",
      });
    }

    // Hash the password using bcrypt
    const salt = 10;
    plaintext = req.body.password.toString();
    const hashedPassword = await bcrypt.hash(plaintext, salt);
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered with Us. Please Sign Up to Continue",
      });
    }
    // // Check if both password and user.password are strings
    // if (typeof password == "string" || typeof user.password == "string") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid password data",
    //   });
    // }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(String(password), String(user.password))) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in the database
      user.token = token;
      user.password = undefined;

      // Set Cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login Success",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Login Failure. Please try again later",
    });
  }
};
