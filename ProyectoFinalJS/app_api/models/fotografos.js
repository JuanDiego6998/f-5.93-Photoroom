var mongoose = require('mongoose');

var fotosSchema = new mongoose.Schema({
    url:{type:String, required:true},
    titulo:String,
    caption:String,
    fecha:String,
    tags:[String],
    metadata:[String]
});

var fotografosSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    bio:{type:String, required:true},
    portafolio:String,
    celular:String,
    correo:{type:String, required:true},
    direccion:String,
    fotoperfil:{type:String, required:true},
    redes:String,
    fotos:[fotosSchema]
});

mongoose.model('fotografos', fotografosSchema, 'fotografos');