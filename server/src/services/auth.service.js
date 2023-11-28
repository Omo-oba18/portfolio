const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "portfolio-user";
const crypto = require("crypto");
const config = require("../configs/db.config");

const saltRounds = 10;

async function saveUser(req, res) {
  const { phone, password, email, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Password hashing failed" });
      }

      const newUser = new User({
        phone,
        password: hashedPassword,
        email,
        name,
      });
      await newUser
        .save()
        .then((user) => {
          res
            .status(201)
            .json({ message: "User registered successfully", data: user });
        })
        .catch((error) => {
          if (error.name === "ValidationError") {
            const validationErrors = {};

            for (const field in error.errors) {
              validationErrors[field] = error.errors[field].message;
            }

            res.status(400).json({ errors: validationErrors });
          } else {
            console.error("Database error:", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
        });
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable " });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Password invalid", error: err.message });
      }

      if (result) {
        const token = jwt.sign(
          { userId: user._id, userEmail: user.email, userName: user.name },
          secretKey,
          {
            expiresIn: "12h",
          }
        );
        return res.status(200).json({
          message: "Login successful",
          expires_in: "12h",
          token: token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      }
      return res.status(401).json({ message: "Invalid email or password" });
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

module.exports = {
  saveUser,
  login,
};
