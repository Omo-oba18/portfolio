const user = require("../services/auth.service");

async function registerUser(req, res) {
  try {
    return await user.saveUser(req, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while saving user", error: err.message });
  }
}

async function login(req, res) {
  try {
    return await user.login(req, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while logging", error: err.message });
  }
}

module.exports = { registerUser, login };
