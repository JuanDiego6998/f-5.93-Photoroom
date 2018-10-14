var express = require('express');
var router = express.Router();

/* GET perfil page. */
var ctrlPerfil = require('../controller/ctrlPerfil');
router.get('/perfil',ctrlPerfil.index);
module.exports=router;
