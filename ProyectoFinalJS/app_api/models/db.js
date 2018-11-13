var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/F_593';
mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', function(){
    console.log("mongoose connected to " + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log("mongoose connection error:" + err);
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose disconnected");
});

var gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through' + msg);
        callback();
    });
};

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon shutdown', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefulShutdown('Heroku shutdown', function(){
        process.exit(0);
    });
});

require('./fotografos');