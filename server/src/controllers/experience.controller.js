
const experience = require("../services/experience.service");

async function createExperience(req, res) {
  try {
    return await experience.saveExperience(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving experience", error: error.message });
  }
}

async function getExperiences(req, res) {
  try {
    return await experience.getAllExperiences(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving experiences",
      error: error.message,
    });
  }
}
async function updateExperience(req, res) {
  try {
    return await experience.modifyExperience(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating experience", error: error.message });
  }
}

async function deleteExperience(req, res) {
  try {
    return await experience.removeExperience(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting experience", error: error.message });
  }
}

module.exports = {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiences,
};
