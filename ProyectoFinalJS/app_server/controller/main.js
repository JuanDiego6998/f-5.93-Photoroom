module.exports.index = function(req,res){
	res.render('index',{title:'Home'});
}

module.exports.perfil=function(req,res){
	res.render('perfil',{title:'Perfil'});
}

module.exports.fotografos=function(req,res){
	res.render('fotografos',{title:'Fotografos'});
}

module.exports.categorias = function(req,res){
	res.render('categorias',{title:'Categorias'});
}
