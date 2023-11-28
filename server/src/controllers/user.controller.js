const user = require("../services/user.service");

async function getUser(req, res) {
  try {
    return await user.getUserInfo(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving user",
      error: error.message,
    });
  }
}
async function updateUser(req, res) {
  try {
    return await user.updateUserInfo(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while updating user",
      error: error.message,
    });
  }
}

module.exports = { getUser, updateUser };
