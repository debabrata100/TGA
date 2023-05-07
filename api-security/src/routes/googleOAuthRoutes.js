const express = require("express");
const config = require("config");
const qs = require("qs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { googleSignupHandler } = require("../controllers/signupController");

const router = express.Router();

async function getGoogleOAuthTokens(code) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: config.get("googleClientId"),
    client_secret: config.get("googleClientSecret"),
    redirect_uri: config.get("googleOAuthRedirectUri"),
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (e) {
    console.log("Failed to fetch google auth tokens", e);
    throw new Error(e.message);
  }
}

async function getGoogleUser({ id_token, access_token }) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error("Error at getGoogleUser", e);
  }
}

async function googleAuthHandler(req, res, next) {
  // get the code from qs
  const code = req.query.code;
  // get id and access token with the code
  const { id_token, access_token } = await getGoogleOAuthTokens(code);

  // const googleUser = jwt.decode(id_token);

  // get google user using access and id token
  // Although this step is not required since we get user info using jwt.decode
  const googleUser = await getGoogleUser({ id_token, access_token });
  if (!googleUser.verified_email) {
    return res.status(403).send("Google User is not verified");
  }
  req.googleUser = googleUser;
  next();
}

router.get("/", googleAuthHandler, googleSignupHandler);

module.exports = router;
