const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    unique: true,
  },
  institution: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
