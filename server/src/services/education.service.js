const BaseService = require("./base.service");
const Education = require("../models/education.model"); // Replace 'Education' with your actual Education model

class EducationService extends BaseService {
  constructor() {
    super(Education, "image"); // 'image' should be replaced with your actual image field name in the Education model
  }

  async createEducation(userId, req, educationData) {
    try {
      if (req.file) {
        const savedEducation = await this.saveWithImage(userId, req, educationData);
        return savedEducation;
      } else {
        const savedEducation = await this.saveWithoutImage(userId, educationData);
        return savedEducation;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateEducation(userId, id, updatedData, req) {
    try {
      if (req.file) {
        const updatedEducation = await this.updateWithImage(
          userId,
          id,
          req,
          updatedData
        );
        return updatedEducation;
      } else {
        const updatedEducation = await this.updateWithoutImage(
          userId,
          id,
          updatedData
        );
        return updatedEducation;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllEducations() {
    try {
      const allEducations = await this.getAll();
      return allEducations;
    } catch (error) {
      throw { message: "Failed to fetch educations", error: error.message };
    }
  }

  async getEducationById(id) {
    try {
      const education = await this.getById(id);
      if (!education) {
        throw { message: "Education not found" };
      }
      return education;
    } catch (error) {
      throw { message: "Failed to fetch education by ID", error: error.message };
    }
  }

  async deleteEducation(id) {
    try {
      const deletedEducation = await this.delete(id);
      if (!deletedEducation) {
        throw { message: "Education not found" };
      }
      return deletedEducation;
    } catch (error) {
      throw { message: "Failed to delete education", error: error.message };
    }
  }
}

module.exports = new EducationService();
