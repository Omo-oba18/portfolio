const education = require("../services/education.service");

async function createEducation(req, res) {
  try {
    return await education.saveEducation(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving education", error: error.message });
  }
}

async function getEducations(req, res) {
  try {
    return await education.getAllEducations(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving educations",
      error: error.message,
    });
  }
}
async function updateEducation(req, res) {
  try {
    return await education.modifyEducation(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating education", error: error.message });
  }
}

async function deleteEducation(req, res) {
  try {
    return await education.removeEducation(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting education", error: error.message });
  }
}

module.exports = {
  createEducation,
  updateEducation,
  deleteEducation,
  getEducations,
};
