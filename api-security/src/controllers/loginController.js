const _ = require("lodash");
const { Users } = require("../db");
const { generateJwtToken, verifyPassword } = require("../utils/commonUtils");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne((user) => user.email === email);
    if (user) {
      const isValidPassword = await verifyPassword(password, user.password);
      if (isValidPassword === true) {
        const token = generateJwtToken({ id: user.id, email: user.email });
        const cookie1Expiry = new Date(Date.now() + 3600000);
        res.cookie("userToken", token, {
          httpOnly: true,
          expires: cookie1Expiry,
        });
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
  return _.omit(user, ["password"]);
}

module.exports = loginController;
