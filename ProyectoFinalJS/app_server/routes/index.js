var express = require('express');
var router = express.Router();

/* GET home page. */
var ctrlMain = require('../controller/main');
router.get('/', ctrlMain.index);
module.exports=router;
