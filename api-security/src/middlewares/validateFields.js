const _ = require("lodash");

function validateCreateNoteFields(req, res, next) {
  const body = req.body || {};
  const requiredFields = ["title", "description"];
  const missingFields = _.difference(requiredFields, Object.keys(body));
  if (!_.isEmpty(missingFields)) {
    return res.status(400).json({
      error: `Missing required fields`,
      missingFields: missingFields,
    });
  }
  next();
}

module.exports = { validateCreateNoteFields };
