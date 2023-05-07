const { Users } = require("../db");
const { hasPassword, generateJwtToken } = require("../utils/commonUtils");

async function signupController(req, res) {
  try {
    const { firstName, lastName, email, password, role = "student" } = req.body;
    const existingUser = await Users.findOne((user) => user.email === email);
    if (existingUser) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      const hashPassword = await hasPassword(password);
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
      });
      const token = generateJwtToken({ id: newUser.id, email });
      const cookie1Expiry = new Date(Date.now() + 3600000);
      res.cookie("userToken", token, {
        httpOnly: true,
        expires: cookie1Expiry,
      });
      res.status(201).json({ firstName, lastName, email, role });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
}

async function googleSignupHandler(req, res) {
  try {
    const { name, email, role = "student" } = req.googleUser;
    const [firstName, lastName] = name.split(" ");
    const existingUser = await Users.findOne((user) => user.email === email);
    let userDetails = existingUser;
    if (!existingUser) {
      userDetails = await Users.create({
        firstName,
        lastName,
        email,
        role,
      });
    }

    const token = generateJwtToken({
      id: userDetails.id,
      email,
      firstName,
      lastName,
    });
    const cookie1Expiry = new Date(Date.now() + 3600000);
    res.cookie("userToken", token, {
      httpOnly: true,
      expires: cookie1Expiry,
    });
    res.redirect("http://localhost:3000");
  } catch (e) {
    console.error("error", e);
    res.send("Something went wrong");
  }
}

module.exports = { signupController, googleSignupHandler };
