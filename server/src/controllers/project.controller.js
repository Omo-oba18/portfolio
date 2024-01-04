const projectService = require("../services/project.service");

async function createProject(req, res) {
  try {
    const projectData = req.body;
    const savedProject = await projectService.createProject(
      req.userId,
      req,
      projectData
    );
    res.status(201).json(savedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving project", error: error.message });
  }
}

async function getProjects(req, res) {
  try {
    const allProjects = await projectService.getAllProjects();
    return res.status(200).json({ message: "Projects: ", data: allProjects });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error while retrieving projects",
        error: error.message,
      });
  }
}
async function getProject(req, res) {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    return res.status(200).json({ message: "Projects: ", data: project });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error while retrieving project",
        error: error.message,
      });
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProject = await projectService.updateProject(
      req.userId,
      id,
      updatedData,
      req
    );
    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating project", error: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const deletedProject = await projectService.deleteProject(id);
    res.json(deletedProject);
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
  getProject,
};
