var express = require('express');
var router = express.Router();

/* GET categorias page. */
var ctrlCategorias = require('../controller/ctrlCategorias');
router.get('/categorias',ctrlCategorias.categorias);
module.exports=router;
