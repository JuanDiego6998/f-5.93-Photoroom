var mongoose = require('mongoose');
var fotografos = mongoose.model("fotografos");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

//crear una nueva foto en un fotografo especifico
module.exports.fotosCreate = function (req, res) {
    var fotografoid = req.params.fotografoid;
    if (fotografoid) {
        fotografos
            .findById(fotografoid)
            .select('fotos')
            .exec(
                function (err, fotografo) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        addFoto(req, res, fotografo);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, fotografo id required"
        });
    }
};

//funcion para crear la foto
var addFoto = function (req, res, fotografo) {
    if (!fotografo) {
        sendJsonResponse(res, 404, {
            "message": "fotografoid not found"
        });
    } else {
        fotografo.fotos.push({
            url: req.body.url,
            titulo: req.body.titulo,
            caption: req.body.caption,
            fecha: req.body.fecha,
            tags: req.body.tags.split(","),
            metadata: req.body.metadata.split(",")
        });
        fotografo.save(function (err, fotografo) {
            var thisFoto;
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                thisFoto = fotografo.fotos[fotografo.fotos.length - 1];
                sendJsonResponse(res, 201, thisFoto);
            }
        });
    }
};

//despliega lista de todas las fotos de un fotografo especifico
module.exports.fotosList = function (req, res) {
    if (req.params && req.params.fotografoid) {
        fotografos
            .findById(req.params.fotografoid)
            .select('nombre fotos')
            .exec(function (err, fotografo) {
                var response, fotos;
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografoid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                //falta arreglar el query para todas las fotos
                /*if (fotografo.fotos && fotografo.fotos.length > 0) {
                    fotos = fotografo.find({});
                    if (!fotos) {
                        sendJsonResponse(res, 404, {
                            "message": "fotos not found"
                        });
                    } else {
                        response = {
                            fotografo: {
                                nombre: fotografo.nombre,
                                id: req.params.fotografoid
                            },
                            fotos: fotos
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No fotos found"
                    });
                }*/
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No fotografosid in request"
        });
    }
};

//actualiza una foto de un fotografo especifico
module.exports.fotosUpdateOne = function (req, res) {
    if (!req.params.fotografoid || !req.params.fotoid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, fotografoid and fotoid required"
        });
        return;
    }
    fotografos
        .findById(req.params.fotografoid)
        .select('fotos')
        .exec(
            function (err, fotografo) {
                var thisFoto;
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografoid not found"
                    });
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (fotografo.fotos && fotografo.fotos.length > 0) {
                    thisFoto = fotografo.fotos.id(req.params.fotoid);
                    if (!thisFoto) {
                        sendJsonResponse(res, 404, {
                            "message": "fotoid not found"
                        });
                    } else {
                        thisFoto.url = req.body.url;
                        thisFoto.titulo = req.body.titulo;
                        thisFoto.caption = req.body.caption;
                        thisFoto.fecha = req.body.fecha;
                        thisFoto.tags = req.body.tags;
                        thisFoto.metadata = req.body.metadata;
                        fotografo.save(function (err, fotografo) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 200, thisFoto);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No foto to update"
                    });
                }
            }
        );
};

//elimina una foto de un fotografo especifico
module.exports.fotosDeleteOne = function (req, res) {
    if (!req.params.fotografoid || !req.params.fotoid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, fotografoid and foto id required"
        });
        return;
    }
    fotografos
        .findById(req.params.fotografoid)
        .select('fotos')
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
                if (fotografo.fotos && fotografo.fotos.length > 0) {
                    if (!fotografo.fotos.id(req.params.fotoid)) {
                        sendJsonResponse(res, 404, {
                            "message": "fotoid not found"
                        });
                    } else {
                        fotografo.fotos.id(req.params.fotoid).remove();
                        fotografo.save(function (err) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "mesage": "No foto to delete"
                    });
                }
            }
        );
};

//despliega una foto especifica de un fotografo especifico
module.exports.fotosReadOne = function (req, res) {
    if (req.params && req.params.fotografoid && req.params.fotoid) {
        fotografos
            .findById(req.params.fotografoid)
            .select('nombre fotos')
            .exec(function (err, fotografo) {
                var response, fotos;
                if (!fotografo) {
                    sendJsonResponse(res, 404, {
                        "message": "fotografosid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if (fotografo.fotos && fotografo.fotos.length > 0) {
                    fotos = fotografo.fotos.id(req.params.fotoid);
                    if (!fotos) {
                        sendJsonResponse(res, 404, {
                            "message": "fotoid not found"
                        });
                    } else {
                        response = {
                            fotografo: {
                                nombre: fotografo.nombre,
                                id: req.params.fotografoid
                            },
                            fotos: fotos
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No fotos found"
                    });
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No fotografosid in request"
        });
    }
};

module.exports.fotosReadByTag = function (req, res, tag) {
    fotografos
        .find()
        .select('fotos')
        .find({tags: tag})
        .exec(function (err) {
            var response, fotos;
            if (fotografo.fotos && fotografo.fotos.length > 0) {
                sendJsonResponse(res, 200, response);
            }
        }
        );
}