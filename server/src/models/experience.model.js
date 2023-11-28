const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  responsibilities: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
