const User = require("../models/user.model");

const multer = require("multer");

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
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  }).single("profilePicture");

  try {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading file", error: err.message });
      }
      if (req.file) {
        const fileBuffer = req.file.buffer;
        const base64Image = fileBuffer.toString("base64");
        userDataToUpdate.profilePicture = base64Image;
        console.log(userDataToUpdate.profilePicture);
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: userDataToUpdate },
        {
          new: true,
        }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "User information updated successfully: ",
        data: updatedUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserInfo,
  updateUserInfo,
};
