var express = require('express');
var router = express.Router();

/* GET home page. */
var ctrlFotografos = require('../controller/ctrlFotografos');
router.get('/categorias',ctrlFotografos.index);
module.exports=router;
