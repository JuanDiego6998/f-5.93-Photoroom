var mongoose = require('mongoose');
var fotografos = mongoose.model("fotografos");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.fotosCreate = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.fotosList = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};


/*module.exports.fotosReadOne = function (req, res) {
    fotografos
        .findById(req.params.fotoid)
        .exec(function (err, foto) {
            sendJsonResponse(res, 200, foto);
        });
};*/
module.exports.fotosUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.fotosDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

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