const Project = require("../models/project.model");

async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.project = project;
    next(); // Call next without passing an error parameter
  } catch (error) {
    next(error); // Call next with the error parameter
  }
}

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: "Available projects: ", data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveProject = async (req, res) => {
  const { title, description, technologies, images, githubLink } = req.body;

  try {
    const existingProject = await Project.findOne({ githubLink });

    if (existingProject) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const newProject = new Project({
      title,
      description,
      technologies,
      images,
      githubLink,
    });
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Project creation failed", error: error.message });
  }
};

async function modifyProject(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getProject(req, res, async () => {
      if (req.body.title != null) {
        res.project.title = req.body.title;
      }

      if (req.body.description != null) {
        res.project.description = req.body.description;
      }

      if (req.body.technologies != null) {
        res.project.technologies = req.body.technologies;
      }
      if (req.body.images != null) {
        res.project.images = req.body.images;
      }
      if (req.body.githubLink != null) {
        res.project.githubLink = req.body.githubLink;
      }

      const updatedProject = await res.project.save();
      res.json({ message: "Project modified", data: updatedProject });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function removeProject(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getProject(req, res, async () => {
      await res.project.remove();
      res.json({ message: "Project deleted" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProjects,
  saveProject,
  modifyProject,
  removeProject,
};
