var express = require('express');
var router = express.Router();

/* GET categorias page. */
router.get('/categorias', function(req, res, next){
  res.render('categorias', { title: 'Categorias'});
});

module.exports = router;
