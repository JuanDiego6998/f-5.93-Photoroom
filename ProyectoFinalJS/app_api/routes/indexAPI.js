var express = require('express');
var router = express.Router();
var ctrlFotografos = require('../controllers/ctrlFotografosAPI');
var ctrlFotos = require('../controllers/ctrlFotosAPI');


router.get('/fotografos', ctrlFotografos.fotografosList);
router.post('/fotografos',ctrlFotografos.fotografosCreate);
router.get('/fotografos/:fotografoid', ctrlFotografos.fotografosReadOne);
router.put('/fotografos/:fotografoid',ctrlFotografos.fotografosUpdateOne);
router.delete('/fotografos/:fotografoid', ctrlFotografos.fotografosDeleteOne);

router.get('/fotografos/:fotografoid/fotos', ctrlFotos.fotosList);
router.post('/fotografos/:fotografoid/fotos',ctrlFotos.fotosCreate);
router.get('/fotografos/:fotografoid/fotos/:fotoid',ctrlFotos.fotosReadOne);
router.put('/fotografos/:fotografoid/fotos/:fotoid',ctrlFotos.fotosUpdateOne);
router.delete('/fotografos/:fotografoid/fotos/:fotoid', ctrlFotos.fotosDeleteOne);

module.exports = router;