const mongoose = require("mongoose");
const config = require("../configs/db.config");

mongoose
  .connect(config.uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB atlas", error);
  });

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  bio: { type: String },
  aboutMe: { type: String },
  socialLinks: {
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  profilePicture: { type: String, default: null },
  skills: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
  ],
  educations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Education", required: true },
  ],
  experiences: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  ],
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
