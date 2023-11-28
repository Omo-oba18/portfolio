const Skill = require("../models/skills.model");

async function saveSkill(req, res) {
  const { name, proficiency, description, userId } = req.body;
  try {
    const existingSkill = await Skill.findOne({ name });

    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    const newSkill = new Skill({
      name,
      proficiency,
      description,
      userId,
    });
    await newSkill.save();
    res.status(201).json({ message: "Skill saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Skill creation failed", error: error.message });
  }
}

async function getAllSkills(req, res) {
  const page = req.query.page || 1;
  const limit = 10;
  try {
    const skills = await Skill.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ message: "Skills available: ", data: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function modifySkill(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getSkill(req, res, async () => {
      if (req.body.name != null) {
        res.skill.name = req.body.name;
      }

      if (req.body.proficiency != null) {
        res.skill.proficiency = req.body.proficiency;
      }

      if (req.body.description != null) {
        res.skill.description = req.body.description;
      }

      const updatedSkill = await res.skill.save();
      res.json({ message: "Skill modified", data: updatedSkill });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function removeSkill(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getSkill(req, res, async () => {
      await res.skill.remove();
      res.json({ message: "Skill deleted" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSkill(req, res, next) {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill == null) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.skill = skill;
    next(); // Call next without passing an error parameter
  } catch (error) {
    next(error); // Call next with the error parameter
  }
}

module.exports = {
  saveSkill,
  getAllSkills,
  modifySkill,
  removeSkill,
};
