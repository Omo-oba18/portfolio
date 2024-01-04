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
const technologyRoutes = require("./src/routes/technology.routes");

if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    origin: "http://192.168.1.104:3000",
  };
  app.use(cors(corsOptions));
} else {
  const corsOptions = {
    origin: "https://portfolio-chablis.vercel.app",
    allowedHeaders: "Content-type, Authorization",
  };
  app.use(cors(corsOptions));
}

app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Laaunched" });
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/technologies", technologyRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`SAAS running good on port ${PORT}`);
});

module.exports = app;
