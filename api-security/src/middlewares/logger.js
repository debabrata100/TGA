const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../../access.log"),
  {
    flags: "a",
  }
);

function applyLogger(app) {
  app.use(morgan("dev"));
  // app.use(morgan("combined", { stream: accessLogStream }));
}

module.exports = applyLogger;
