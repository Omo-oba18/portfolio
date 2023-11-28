const Experience = require("../models/experience.model");

async function getExperience(req, res, next) {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience == null) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.experience = experience;
    next(); // Call next without passing an error parameter
  } catch (error) {
    next(error); // Call next with the error parameter
  }
}

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res
      .status(200)
      .json({ message: "Available experiences: ", data: experiences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveExperience = async (req, res) => {
  const { jobTitle, company, startDate, endDate, responsibilities } = req.body;

  try {
    const newExperience = new Experience({
      jobTitle,
      company,
      startDate,
      endDate,
      responsibilities,
    });
    await newExperience.save();
    res.status(201).json({ message: "Experience saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Experience creation failed", error: error.message });
  }
};

async function modifyExperience(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getExperience(req, res, async () => {
      if (req.body.jobTitle != null) {
        res.experience.jobTitle = req.body.jobTitle;
      }

      if (req.body.company != null) {
        res.experience.company = req.body.company;
      }

      if (req.body.startDate != null) {
        res.experience.startDate = req.body.startDate;
      }
      if (req.body.endDate != null) {
        res.experience.endDate = req.body.endDate;
      }
      if (req.body.responsibilities != null) {
        res.experience.responsibilities = req.body.responsibilities;
      }

      const updatedExperience = await res.experience.save();
      res.json({ message: "Experience modified", data: updatedExperience });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function removeExperience(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getExperience(req, res, async () => {
      await res.experience.remove();
      res.json({ message: "Experience deleted" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllExperiences,
  saveExperience,
  modifyExperience,
  removeExperience,
};
