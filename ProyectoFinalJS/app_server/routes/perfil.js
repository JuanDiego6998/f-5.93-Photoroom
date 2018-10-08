var express = require('express');
var router = express.Router();

/* GET perfil page. */
router.get('/perfil', function(req, res, next){
  res.render('perfil', { title: 'Perfil'});
});

module.exports = router;
