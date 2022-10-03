// COMP229 Assignment 1 | users.js | Andreas Themistocles | 301251197 | October 3rd, 2022
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
