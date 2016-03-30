var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/robotPage', function(req, res, next) {
  res.render('robotPage.jade');
});


module.exports = router;
