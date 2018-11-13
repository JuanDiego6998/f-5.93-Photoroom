var mongoose = require('mongoose');
var fotografos = mongoose.model("fotografos");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.fotografosCreate = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.fotografosList = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};


/*module.exports.fotografosReadOne = function (req, res) {
    fotografos
        .findById(req.params.fotografoid)
        .exec(function (err, fotografo) {
            sendJsonResponse(res, 200, fotografo);
        });


};*/
module.exports.fotografosUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
module.exports.fotografosDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

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