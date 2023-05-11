const express = require("express");
const notesRoute = require("./src/routes/notesRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rolesRoutes = require("./src/routes/rolesRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const googleOAuthRoutes = require("./src/routes/googleOAuthRoutes");
const slowDown = require("express-slow-down");
const cookieParser = require("cookie-parser");
const applyXssMiddleWare = require("./src/middlewares/xssMiddleware");
const csurf = require("csurf");
const applyLogger = require("./src/middlewares/logger");
require("./src/services/redisClient");

const PORT = 5001;

const app = express();

const speedLimiter = slowDown({
  windowMs: 1000, // 1 second
  max: 2, // 2 request per windowMs
});

// Set EJS as the template engine for payment page simulation with csurf protection
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

// Middleware before route
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// apply middleware to log all the requests
// applyLogger(app);
applyXssMiddleWare(app);

// Routes start here
app.use("/api/v1", userRoutes); // signup, login
app.use("/api/v1/roles", rolesRoutes); // create roles, assign roles with role based access control
app.use("/api/v1/notes", speedLimiter, notesRoute); // read, create, delete note with role based access control
app.use("/api/v1/oauth/google", googleOAuthRoutes);

// Enable csurf middleware for payment page
const csurfProtection = csurf({ cookie: true });
app.use("/secure", csurfProtection, paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
