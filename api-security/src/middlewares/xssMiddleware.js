const xss = require("xss");

const filterXss = new xss.FilterXSS();

function applyXssMiddleWare(app) {
  app.use("*", (req, res, next) => {
    if (req.baseUrl.includes("oauth/google")) {
      return next();
    }
    req.query = filterXss.process(req.query);
    req.headers = filterXss.process(req.headers);
    req.url = filterXss.process(req.url);
    next();
  });
}

// Use this middle ware for input validation of fields
function xssSignupMiddleWare(req, res, next) {
  for (const [key, value] of Object.entries(req.body)) {
    req.body[key] = filterXss.process(value);
  }
  next();
}

module.exports = applyXssMiddleWare;
