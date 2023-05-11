const { verifyJwtToken, retrieveAuthToken } = require("../utils/commonUtils");
const redisClient = require("../services/redisClient");

async function authMiddleWare(req, res, next) {
  let token = retrieveAuthToken(req);

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }
  try {
    await redisClient.connect();
    const redisToken = await redisClient.get(token);
    await redisClient.disconnect();
    if (redisToken === "revoked") {
      return res.status(401).json({ error: "Token is revoked" });
    }

    // Verify and decode the JWT token
    const decoded = verifyJwtToken(token);
    // Store the decoded token in the request object for future use
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}

module.exports = authMiddleWare;
