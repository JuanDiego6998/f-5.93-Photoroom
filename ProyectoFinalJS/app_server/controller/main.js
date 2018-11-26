var request = require('request');
var apiOptions = {
	server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://F_593.herokuapp.com';
}
//como pasar varios parametros de body al render
var renderHome = function (req, res, fotoDestacada1/*, fotoDestacada2*/) {
	res.render('index', {
		title: 'Home',
		urldestacadas: [
			fotoDestacada1.fotos.url,
			'img/Quilotoa_021118-1.JPG',
			'img/HorseshoeBend-2.JPG'
		],
		categorias: [
			'Naturaleza',
			'Paisaje',
			'Retrato',
			'Estudio'
		],
		fotosdestacadas: [{
			urlfoto: fotoDestacada1.fotos.url,
			titulofoto: fotoDestacada1.fotos.titulo,
			captionfoto: fotoDestacada1.fotos.caption,
			fotografo: fotoDestacada1.fotografo.nombre,
			fechafoto: fotoDestacada1.fotos.fecha,
			tags: fotoDestacada1.fotos.tags
		},
		{
			urlfoto: 'img/Dumbo-2.JPG',
			titulofoto: 'Titulo foto 2',
			captionfoto: 'Caption foto 2',
			fotografo: 'Fotografo 2',
			fechafoto: 'Fecha foto 2',
			tags: [
				'tag1',
				'tag2'
			]
		}/*,
		{
			urlfoto: fotoDestacada2.fotos.url,
			titulofoto: fotoDestacada2.fotos.titulo,
			captionfoto: fotoDestacada2.fotos.caption,
			fotografo: fotoDestacada2.fotografo.nombre,
			fechafoto: fotoDestacada2.fotos.fecha,
			tags: fotoDestacada2.fotos.tags
		}*/
		]
	});
}

module.exports.index = function (req, res) {
	var requestOptionsOne, requestOptionsTwo;
	var pathOne = apiOptions.server + '/api/fotografos/5bf9f4ac8a0dcf13e02127e4/fotos/5bfa00f2ee733f72d4038fae';
	var pathTwo = apiOptions.server + '/api/fotografos/5bf9f4ac8a0dcf13e02127e4/fotos/5bfa00f2ee733f72d4038faf';
	requestOptionsOne = {
		url: pathOne,
		method: 'GET',
		json: {}
	};
	requestOptionsTwo = {
		url: pathTwo,
		method: 'GET',
		json: {}
	};
	request(
		requestOptionsOne,
		function (err, response, body) {
			//var bodyOne = body;
			renderHome(req, res, body);
		}
	);
	//segundo request para segunda foto destacada, se necesita este body tambien
	request(
		requestOptionsTwo,
		function (err, res, body) {
			var bodyTwo = body;
		}
	);
}

module.exports.perfil = function (req, res) {
	res.render('perfil', {
		title: 'Perfil',
		urlfotofondo: 'img/prin1080.jpg'
	});
}

module.exports.fotografos = function (req, res) {
	res.render('fotografos', {
		title: 'Fotografos',
		urlfotofondo: 'img/paisaje.jpg'
	});
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
