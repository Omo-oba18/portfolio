const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config({ path: ".env.local" });
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const skillRoutes = require("./src/routes/skill.routes");
const projectRoutes = require("./src/routes/project.routes");
const educationRoutes = require("./src/routes/education.routes");
const experienceRoutes = require("./src/routes/experience.routes");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Laaunched" });
});

app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/user", userRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SAAS running good on port ${PORT}`);
});

module.exports = app;
