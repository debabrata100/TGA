var express = require("express");
var router = express.Router();
let speakers = require("../data/speakers.json");

router.get("/", function (req, res, next) {
  res.json(speakers);
});

router.use("/:id", function (req, res, next) {
  if (req.method.toLocaleLowerCase() === "delete") {
    return next();
  }
  const { id } = req.params;
  const speaker = speakers.find((sp) => sp.id === id);
  if (speaker) {
    req.speaker = speaker;
    return next();
  }
  res.send(404);
});

//GET
router.get("/:id", function (req, res, next) {
  res.json(req.speaker);
});

//POST
router.post("/", function (req, res, next) {
  let body = req.body;
  speakers.push(body);
  res.status(201).json(body);
});

//PUT-PATCH
router.patch("/:id", function (req, res, next) {
  Object.entries(req.body).forEach((item) => {
    const key = item[0];
    const value = item[1];
    req.speaker[key] = value;
  });
  res.json(req.speaker);
});

router.delete("/:id", (req, res) => {
  speakers = speakers.filter((sp) => sp.id !== req.params.id);
  res.json(speakers);
});

module.exports = router;
