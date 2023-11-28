const jwt = require("jsonwebtoken");
const secretKey = "portfolio-user";

const checkLoggedUserType = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split("Bearer")[1].trim();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = checkLoggedUserType;
