const project = require("../services/project.service");

async function createProject(req, res) {
  try {
    return await project.saveProject(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving project", error: error.message });
  }
}

async function getProjects(req, res) {
  try {
    return await project.getAllProjects(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving projects",
      error: error.message,
    });
  }
}
async function updateProject(req, res) {
  try {
    return await project.modifyProject(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating project", error: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    return await project.removeProject(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting project", error: error.message });
  }
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
};
