const path = require("path");
const fs = require("fs");
const Project = require("../models/project.model");
const BaseService = require("./base.service");

class ProjectService extends BaseService {
  constructor() {
    super(Project, "images");
  }

  async createProject(userId, req, projectData) {
    try {
      const imagePaths = [];

      // Check if there are images in the project data
      if (projectData.images && projectData.images.length > 0) {
        // Iterate through each base64-encoded image
        for (const base64Image of projectData.images) {
          // Extract the base64 data (remove the header)
          const base64Data = base64Image.replace(
            /^data:image\/\w+;base64,/,
            ""
          );

          // Convert the base64 string to a buffer
          const buffer = Buffer.from(base64Data, "base64");

          // Generate a unique file name for the image
          const fileName = `${Date.now()}_${Math.random()}.png`;

          // Specify the relative path (without full directory)
          const relativePath = path.join("/images", fileName);

          // Write the buffer data to the file
          const imagePath = path.join(
            __dirname,
            "../../public/images",
            fileName
          );
          fs.writeFileSync(imagePath, buffer);

          // Store the relative path in the imagePaths array
          imagePaths.push(relativePath);
        }
      }

      projectData.images = imagePaths;

      const savedProject = await this.saveWithoutImage(userId, projectData);
      return savedProject;
    } catch (error) {
      throw error;
    }
  }

  async updateProject(userId, id, updatedData, req) {
    try {
      if (req.file) {
        const updatedProject = await this.updateWithImage(
          userId,
          id,
          req,
          updatedData
        );
        return updatedProject;
      } else {
        const updatedProject = await this.updateWithoutImage(
          userId,
          id,
          updatedData
        );
        return updatedProject;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects() {
    try {
      const allProjects = await this.getAll();
      return allProjects;
    } catch (error) {
      throw { message: "Failed to fetch projects", error: error.message };
    }
  }

  async getProjectById(id) {
    try {
      const project = await this.getById(id);
      if (!project) {
        throw { message: "Project not found" };
      }
      return project;
    } catch (error) {
      throw { message: "Failed to fetch project by ID", error: error.message };
    }
  }

  async deleteProject(id) {
    try {
      const deletedProject = await this.delete(id);
      if (!deletedProject) {
        throw { message: "Project not found" };
      }
      return deletedProject;
    } catch (error) {
      throw { message: "Failed to delete project", error: error.message };
    }
  }
}

module.exports = new ProjectService();
