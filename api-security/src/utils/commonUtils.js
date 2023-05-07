const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

function generateJwtToken(tokenContent) {
  const token = jwt.sign(tokenContent, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
function verifyJwtToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

async function hasPassword(password) {
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
}

async function verifyPassword(passwordToVerify, existingPassword) {
  const isValidPassword = await bcrypt.compare(
    passwordToVerify,
    existingPassword
  );
  return isValidPassword;
}

module.exports = {
  generateJwtToken,
  verifyJwtToken,
  hasPassword,
  verifyPassword,
};
