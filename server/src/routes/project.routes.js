const express = require("express");
const checkLoggedUserType = require("../middleware/auth.middleware");

const router = express.Router();
const project = require("../controllers/project.controller");

router.post("/", checkLoggedUserType, project.createProject);

router.get("/", project.getProjects);

router.put("/:id", checkLoggedUserType, project.updateProject);

router.delete("/:id", checkLoggedUserType, project.deleteProject);

module.exports = router;
