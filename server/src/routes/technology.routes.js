const express = require("express");
const router = express.Router();
const technology = require("../controllers/technology.controller");

// Endpoint for retrieving all technologies
router.get("/", technology.getAllTechnologies);

// Endpoint for retrieving filtered technologies
router.get("/search", technology.searchTechnology);

module.exports = router;
