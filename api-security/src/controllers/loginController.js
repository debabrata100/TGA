const _ = require("lodash");
const { Users } = require("../db");
const {
  generateJwtToken,
  verifyPassword,
  verifyJwtToken,
} = require("../utils/commonUtils");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne((user) => user.email === email);
    if (user) {
      const isValidPassword = await verifyPassword(password, user.password);
      if (isValidPassword === true) {
        const accessToken = generateJwtToken(
          { id: user.id, email: user.email },
          "15m"
        );
        res.cookie("userToken", accessToken, {
          httpOnly: true,
        });
        const refreshToken = generateJwtToken(
          { id: user.id, email: user.email },
          "7d"
        );
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        return res.status(200).json(userResponse(user));
      }
    }
    res.status(401).json({ error: "Invalid login credentials" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
}

function userResponse(user) {
  return _.omit(user, ["password"], ["id"]);
}

function refreshProfile(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(4000).json({
      error: `Missing required fields`,
      missingFields: ["token"],
    });
  }

  try {
    // validate refresh token
    const decoded = verifyJwtToken(token);
    const accessToken = generateJwtToken(
      { id: decoded.id, email: decoded.email },
      "15m"
    );
    res.cookie("userToken", accessToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "Access Token generated successfully",
    });
  } catch (e) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

module.exports = { loginUser, refreshProfile };
