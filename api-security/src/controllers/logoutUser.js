const { retrieveAuthToken } = require("../utils/commonUtils");
const redisClient = require("../services/redisClient");

async function logoutUser(req, res) {
  // Use Redis to store black listed token
  // Periodically clean the expired token from blacklist
  // During Token verification put a check for blacklisted token
  // Or Use Db to store the same

  try {
    let token = retrieveAuthToken(req);
    await redisClient.connect();
    await redisClient.set(token, "revoked");
    await redisClient.disconnect();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Something went wrong" });
  }
}

module.exports = logoutUser;
