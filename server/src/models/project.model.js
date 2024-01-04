const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  technologies: [{ type: String, required: true }],
  images: [{ type: String }],
  githubLink: { type: String },
  projectUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
