'use strict'

var app = require('./app.js')
var config = require('./config');
var mongoose = require('mongoose');

var promise = mongoose.connect(config.db,config.options,function(err,res){
  if(err){
    return console.log(`Error al establecer CX con MongoDB:\n${err}`);
  } else {
    console.log(`Conexión con MongoDB establecida`)
    app.listen(config.port);
    console.log(`Server running at port ${config.port}`);
  }
});
