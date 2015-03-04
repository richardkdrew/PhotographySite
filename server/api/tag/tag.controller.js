'use strict';

// Get list of tags
exports.index = function (req, res) {
  res.json([{"name": "Vanquish"}, {"name": "Vantage"}, {"name": "DBS"}]);
};
