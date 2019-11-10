var express = require('express');
var router = express.Router();

/* GET result listing. */
router.get('/', function(req, res, next) {
  res.render('result', { page: 'result'});
});

module.exports = router;