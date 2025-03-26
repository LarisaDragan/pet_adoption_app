require("dotenv").config(); // loading env variables
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers["authorization"] || req.headers.authorization;

  // Check if token exists
  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401); // Unauthorized
  }

  // Verify token
  const tokenValue = token.split(" ")[1]; // Extract token value from "Bearer <token>"

  jwt.verify(tokenValue, process.env.SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed");
      return res.sendStatus(403); // Forbidden
    }

    // Token is valid, set user information in request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
