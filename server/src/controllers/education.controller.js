const educationService = require("../services/education.service");

async function createEducation(req, res) {
  try {
    const educationData = req.body;
    const savedEducation = await educationService.createEducation(
      req.userId,
      req,
      educationData
    );
    res.status(201).json(savedEducation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while saving education", error: error.message });
  }
}

async function getEducations(req, res) {
  try {
    const allEducations = await educationService.getAllEducations();
    return res.status(200).json({ message: "Educations: ", data: allEducations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while retrieving educations", error: error.message });
  }
}
async function getEducation(req, res) {
  try {
    const { id } = req.params;
    const education = await educationService.getEducationById(id);
    return res.status(200).json({ message: "Educations: ", data: education });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while retrieving education", error: error.message });
  }
}

async function updateEducation(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedEducation = await educationService.updateEducation(
      req.userId,
      id,
      updatedData,
      req
    );
    res.json(updatedEducation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating education", error: error.message });
  }
}

async function deleteEducation(req, res) {
  try {
    const { id } = req.params;
    const deletedEducation = await educationService.deleteEducation(id);
    res.json(deletedEducation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting education", error: error.message });
  }
}

module.exports = {
  createEducation,
  updateEducation,
  deleteEducation,
  getEducations,
  getEducation,
};


// const education = require("../services/education.service");

// async function createEducation(req, res) {
//   try {
//     return await education.saveEducation(req, res);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error while saving education", error: error.message });
//   }
// }

// async function getEducations(req, res) {
//   try {
//     return await education.getAllEducations(req, res);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error while retrieving educations",
//       error: error.message,
//     });
//   }
// }
// async function updateEducation(req, res) {
//   try {
//     return await education.modifyEducation(req, res);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error while updating education", error: error.message });
//   }
// }

// async function deleteEducation(req, res) {
//   try {
//     return await education.removeEducation(req, res);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error while deleting education", error: error.message });
//   }
// }

// module.exports = {
//   createEducation,
//   updateEducation,
//   deleteEducation,
//   getEducations,
// };
