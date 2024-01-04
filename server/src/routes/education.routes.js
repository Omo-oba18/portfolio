const express = require("express");
const checkLoggedUserType = require("../middleware/auth.middleware");

const router = express.Router();
const education = require("../controllers/education.controller");

router.post("/", checkLoggedUserType, education.createEducation);

router.get("/", education.getEducations);

router.put("/:id", checkLoggedUserType, education.updateEducation);
router.get("/:id", checkLoggedUserType, education.getEducation);

router.delete("/:id", checkLoggedUserType, education.deleteEducation);

module.exports = router;
