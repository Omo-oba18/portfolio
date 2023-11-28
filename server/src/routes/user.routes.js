const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const checkLoggedUserType = require("../middleware/auth.middleware");

router.get("/info", user.getUser);
router.put("/:userId", checkLoggedUserType, user.updateUser);
module.exports = router;
