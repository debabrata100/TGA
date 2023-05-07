const { verifyJwtToken } = require("../utils/commonUtils");

function authMiddleWare(req, res, next) {
  let token = req.headers.authorization || req.headers.Authorization;
  token = token && token.split(" ")[1];
  if (req.cookies.userToken) {
    token = req.cookies.userToken;
  }
  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }
  try {
    // Verify and decode the JWT token
    const decoded = verifyJwtToken(token);
    // Store the decoded token in the request object for future use
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}

module.exports = authMiddleWare;
