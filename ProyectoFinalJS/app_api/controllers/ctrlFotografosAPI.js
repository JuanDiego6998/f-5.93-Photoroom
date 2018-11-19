var mongoose = require('mongoose');
var fotografos = mongoose.model("fotografos");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

//crea un nuevo fotografo
module.exports.fotografosCreate = function (req, res) {
    fotografos.create({
        nombre: req.body.nombre,
        bio: req.body.bio,
        portafolio: req.body.portafolio,
        celular: req.body.celular,
        correo: req.body.correo,
        direccion: req.body.direccion,
        fotoperfil: req.body.fotoperfil,
        redes: req.body.redes,
        fotos: [{
            url: req.body.url1,
            titulo: req.body.titulo1,
            caption: req.body.caption1,
            fecha: req.body.fecha1,
            tags: req.body.tags1.split(","),
            metadata: req.body.metadata1.split(",")
        }, {
            url: req.body.url2,
            titulo: req.body.titulo2,
            caption: req.body.caption2,
            fecha: req.body.fecha2,
            tags: req.body.tags2.split(","),
            metadata: req.body.metadata2.split(",")
        }]
    }, function (err, fotografo) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, fotografo)
        }
    });
};

//despliega una lista de todos los fotografos
module.exports.fotografosList = function (req, res) {
    fotografos
        .find()
        .exec(
            function (err, fotografo) {
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografos not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, fotografo);
            });
};

//actualiza un fotografo especifico
module.exports.fotografosUpdateOne = function (req, res) {
    if (!req.params.fotografoid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, fotografoid is required"
        });
        return;
    }
    fotografos
        .findById(req.params.fotografoid)
        .select('-fotos')
        .exec(
            function (err, fotografo) {
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografoid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                fotografo.nombre = req.body.nombre;
                fotografo.bio = req.body.bio;
                fotografo.portafolio = req.body.portafolio;
                fotografo.celular = req.body.celular;
                fotografo.direccion = req.body.direccion;
                fotografo.correo = req.body.correo;
                fotografo.fotoperfil = req.body.fotoperfil;
                fotografo.redes = req.body.redes;
                fotografo.save(function (err, fotografo) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, fotografo);
                    }
                });
            }
        );
};

//elimina un fotografo especifico
module.exports.fotografosDeleteOne = function (req, res) {
    var fotografoid = req.params.fotografoid;
    if (fotografoid) {
        fotografos
            .findByIdAndRemove(fotografoid)
            .exec(
                function (err, fotografo) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No fotografoid"
        });
    }
};

//despliega un fotografo especifico
module.exports.fotografosReadOne = function (req, res) {
    if (req.params && req.params.fotografoid) {
        fotografos
            .findById(req.params.fotografoid)
            .exec(function (err, fotografo) {
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografosid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, fotografo);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No fotografosid in request"
        });
    }
};