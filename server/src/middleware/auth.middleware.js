const jwt = require("jsonwebtoken");
const secretKey = "portfolio-user";

const checkLoggedUserType = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split("Bearer")[1].trim();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  }
};

module.exports = checkLoggedUserType;
