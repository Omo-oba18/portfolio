const express = require("express");
const checkLoggedUserType = require("../middleware/auth.middleware");

const router = express.Router();
const experience = require("../controllers/experience.controller");

router.post("/", checkLoggedUserType, experience.createExperience);

router.get("/", experience.getExperiences);

router.put("/:id", checkLoggedUserType, experience.updateExperience);

router.delete("/:id", checkLoggedUserType, experience.deleteExperience);

module.exports = router;
