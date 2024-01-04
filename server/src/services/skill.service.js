const BaseService = require("./base.service");
const Skill = require("../models/skills.model"); // Replace 'Skill' with your actual Skill model

class SkillService extends BaseService {
  constructor() {
    super(Skill, "image"); // 'image' should be replaced with your actual image field name in the Skill model
  }

  async createSkill(userId, req, skillData) {
    try {
      if (req.file) {
        const savedSkill = await this.saveWithImage(userId, req, skillData);
        return savedSkill;
      } else {
        const savedSkill = await this.saveWithoutImage(userId, skillData);
        return savedSkill;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateSkill(userId, skillId, updatedData, req) {
    try {
      if (req.file) {
        const updatedSkill = await this.updateWithImage(
          userId,
          skillId,
          req,
          updatedData
        );
        return updatedSkill;
      } else {
        const updatedSkill = await this.updateWithoutImage(
          userId,
          skillId,
          updatedData
        );
        return updatedSkill;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllSkills() {
    try {
      const allSkills = await this.getAll();
      return allSkills;
    } catch (error) {
      throw { message: "Failed to fetch skills", error: error.message };
    }
  }

  async getSkillById(id) {
    try {
      const skill = await this.getById(id);
      if (!skill) {
        throw { message: "Skill not found" };
      }
      return skill;
    } catch (error) {
      throw { message: "Failed to fetch skill by ID", error: error.message };
    }
  }

  async deleteSkill(id) {
    try {
      const deletedSkill = await this.delete(id);
      if (!deletedSkill) {
        throw { message: "Skill not found" };
      }
      return deletedSkill;
    } catch (error) {
      throw { message: "Failed to delete skill", error: error.message };
    }
  }
}

module.exports = new SkillService();
