const skillService = require("../services/skill.service");

async function createSkill(req, res) {
  try {
    const skillData = req.body;
    const savedSkill = await skillService.createSkill(
      req.userId,
      req,
      skillData
    );
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSkills(req, res) {
  try {
    const allSkills = await skillService.getAllSkills();
    return res.status(200).json({ message: "Skills: ", data: allSkills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getSkill(req, res) {
  try {
    const { id } = req.params;
    const skill = await skillService.getSkillById(id);
    return res.status(200).json({ message: "Skills: ", data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateSkill(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedSkill = await skillService.updateSkill(
      req.userId,
      id,
      updatedData,
      req
    );
    return res
      .status(201)
      .json({ message: "Skill updated successfully", data: updatedSkill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteSkill(req, res) {
  try {
    const { id } = req.params;
    const deletedSkill = await skillService.deleteSkill(id);
    res.json(deletedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
  getSkill,
};
