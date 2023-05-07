const express = require("express");
const router = express.Router();

// http://localhost:5001/secure/payment
router.get("/payment", (req, res) => {
  res.render("payment", { csrfToken: req.csrfToken() });
});

router.post("/payment", (req, res) => {
  const { amount } = req.body;
  res.send(`Payment successful. Amount: $${amount}`);
});

module.exports = router;
