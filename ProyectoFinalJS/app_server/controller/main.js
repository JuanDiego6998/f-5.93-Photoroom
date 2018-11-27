var request = require('request');
var apiOptions = {
	server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://F_593.herokuapp.com';
}
//como pasar varios parametros de body al render
var renderHome = function (req, res, fotografos, bodyArray) {
	res.render('index', {
		title: 'Home',
		fotografos: fotografos,
		urldestacadas: [
			fotografos[0].urldestacada,
			fotografos[1].urldestacada,
			fotografos[2].urldestacada
		],
		categorias: [
			'Naturaleza',
			'Paisaje',
			'Retrato',
			'Estudio'
		],
		fotosdestacadas: [{
			urlfoto: fotografos[0].urldestacada,
			fotografo: fotografos[0].nombre
		},
		{
			urlfoto: fotografos[1].urldestacada,
			fotografo: fotografos[1].nombre
		},
		{
			urlfoto: fotografos[2].urldestacada,
			fotografo: fotografos[2].nombre
		}
		]
	});
}

module.exports.index = function (req, res) {
	var requestOptionsOne;
	var pathOne = apiOptions.server + '/api/fotografos';
	requestOptionsOne = {
		url: pathOne,
		method: 'GET',
		json: {}
	};
	request(
		requestOptionsOne,
		function (err, response, body) {
			for (var i = 0; i < body.length; i++) {
				if (body.nombre === 'Camilo Sus' || body.nombre === 'Paola Jaramillo') {
					var bodyArray = [body.urldestacada];
				}
			}
			renderHome(req, res, body, bodyArray);
		}
	);
}

var renderPerfil = function (req, res, body) {
	res.render('perfil', {
		title: 'Perfil',
		urlfotofondo: 'img/prin1080.jpg',
		urlfotoperfil: body.fotoperfil,
		nombre: body.nombre,
		bio: body.bio,
		fotos: body.fotos
	});
}

module.exports.perfil = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos/' + req.params.fotografoid;
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderPerfil(req, res, body);
		}
	)
}

var renderFotografos = function(req, res, body){
	res.render('fotografos', {
		title: 'Fotografos',
		urlfotofondo: 'img/paisaje.jpg',
		fotografos: body
	});
}

module.exports.fotografos = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos';
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderFotografos(req, res, body);
		}
	)
}

var renderCategorias = function (req, res, foto1) {
	res.render('categorias', {
		title: 'Categorias',
		urlfotofondo: 'img/paisaje.jpg',
		categorias: [
			'Paisaje',
			'Retrato',
			'Naturaleza',
			'Arquitectura',
			'Periodismo'
		],
		urlfotoslightbox: [
			'img/AntelopeValley-1.jpg',
			'img/AntelopeValley-2.jpg',
			'img/AntelopeValley-3.jpg',
			'img/HighLine-1.jpg',
			'img/HorseshoeBend-2.jpg',
			'img/paisaje3.jpg',
			'img/paisaje4.jpg',
			'img/paisaje5.jpg',
			'img/Quilotoa_021118-1.jpg'
		]
	});
}

module.exports.categorias = function (req, res) {
	var requestOptions, path;
	path = '/api/fotografos/fotos';
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
	};
	request(
		requestOptions,
		function (err, response, body) {
			renderCategorias(req, res, body);
		}
	);
}
