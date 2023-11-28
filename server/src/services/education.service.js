const Education = require("../models/education.model");

async function getEducation(req, res, next) {
  try {
    const education = await Education.findById(req.params.id);
    if (education == null) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.education = education;
    next(); // Call next without passing an error parameter
  } catch (error) {
    next(error); // Call next with the error parameter
  }
}

const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res
      .status(200)
      .json({ message: "Available educations: ", data: educations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveEducation = async (req, res) => {
  const { degree, institution, graduationYear } = req.body;

  try {
    const existingEducation = await Education.findOne({ degree });

    if (existingEducation) {
      return res.status(400).json({ message: "Education already exists" });
    }

    const newEducation = new Education({
      degree,
      institution,
      graduationYear,
    });
    await newEducation.save();
    res.status(201).json({ message: "Education saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Education creation failed", error: error.message });
  }
};

async function modifyEducation(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getEducation(req, res, async () => {
      if (req.body.degree != null) {
        res.education.degree = req.body.degree;
      }

      if (req.body.institution != null) {
        res.education.institution = req.body.institution;
      }

      if (req.body.graduationYear != null) {
        res.education.graduationYear = req.body.graduationYear;
      }

      const updatedEducation = await res.education.save();
      res.json({ message: "Education modified", data: updatedEducation });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function removeEducation(req, res) {
  try {
    // Using the getSkill middleware to retrieve the skill
    await getEducation(req, res, async () => {
      await res.education.remove();
      res.json({ message: "Education deleted" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllEducations,
  saveEducation,
  modifyEducation,
  removeEducation,
};
