const User = require("../models/user.model");

async function getUserInfo(req, res) {
  const userName = req.params.name;
  try {
    const user = await User.findOne({
      name: { $regex: new RegExp(userName, "i") },
    })
      .select("-password -email -_id -__v")
      .populate("educations")
      .populate("skills")
      .populate("experiences")
      .populate("projects");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User: ", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUserInfo(req, res) {
  const userId = req.params.userId;
  const userDataToUpdate = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userDataToUpdate, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User information updated successfully: ",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserInfo,
  updateUserInfo,
};
