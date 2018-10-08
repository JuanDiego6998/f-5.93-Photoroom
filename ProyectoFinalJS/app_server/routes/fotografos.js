var express = require('express');
var router = express.Router();

/* GET fotografos page. */
router.get('/fotografos', function(req, res, next){
  res.render('fotografos', { title: 'Fotógrafos'});
});

module.exports = router;
