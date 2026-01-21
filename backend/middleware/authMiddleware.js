const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If no token
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Token format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info
    next(); // allow access
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
