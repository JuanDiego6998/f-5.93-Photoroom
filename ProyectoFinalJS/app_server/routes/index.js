var express = require('express');
var router = express.Router();

/* GET home page. */
var ctrlMain = require('../controller/main');
router.get('/', ctrlMain.index);
module.exports=router;

var ctrlPerfil = require('../controller/main');
router.get('/perfil',ctrlPerfil.perfil);
module.exports=router;

var ctrlFotografos = require('../controller/main');
router.get('/fotografos',ctrlFotografos.fotografos);
module.exports=router;

var ctrlCategorias = require('../controller/main');
router.get('/categorias',ctrlCategorias.categorias);
module.exports=router;
