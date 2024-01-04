const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  proficiency: {
    type: String,
  },
  description: {
    type: String,
  },
  image: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
