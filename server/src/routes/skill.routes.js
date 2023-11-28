const express = require("express");
const checkLoggedUserType = require("../middleware/auth.middleware");

const router = express.Router();
const skill = require("../controllers/skill.controller");

router.post("/", checkLoggedUserType, skill.createSkill);

router.get("/", skill.getSkills);

router.put("/:id", checkLoggedUserType, skill.updateSkill);

router.delete("/:id", checkLoggedUserType, skill.deleteSkill);

module.exports = router;
