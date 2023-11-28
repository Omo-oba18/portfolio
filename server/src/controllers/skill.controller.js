const skill = require("../services/skill.service");

async function createSkill(req, res) {
  try {
    return await skill.saveSkill(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving skill", error: error.message });
  }
}

async function getSkills(req, res) {
  try {
    return await skill.getAllSkills(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving skills",
      error: error.message,
    });
  }
}
async function updateSkill(req, res) {
  try {
    return await skill.modifySkill(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating skill", error: error.message });
  }
}

async function deleteSkill(req, res) {
  try {
    return await skill.removeSkill(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting skill", error: error.message });
  }
}

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
};
