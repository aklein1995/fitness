'use strict'

//express logic
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//WebSockets
var http = require('http').Server(app);
var io = require('socket.io')(http);
//others
var fs = require('fs');
var request = require ('request');
var cheerio = require('cheerio');
var test= require('./controllers/aerobiccapacity');
var random = require('./random.js');

app.use(express.static('public')); //serve the html views
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/aerobic', function(req,res){
  res.sendFile(__dirname + '/public/workouts.html')
})

app.get('/scrape',function(req,res,next){

  const url = 'http://aerobiccapacity.com/';
  var lastquery=[],warning=false;

  //last 7 data
  test.getLastEntry(7,function(err,array){
    if(err) return res.status(500).send({message:`Error: ${err}`});
    if(array=="") return res.status(404).send({message:`No results`})
    lastquery=array;
    for(let i=0;i<lastquery.length;i++){
      console.log('query category:'+lastquery[i].category+'\nquery descr:'+lastquery[i].description)
    }
  })

  request(url,function(error,response,html){
    console.log('***SCRAPING***')
    if(error) return res.send({message:`Error en el Request: ${error}`})

    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    var $ = cheerio.load(html);

    var workouts = [];

    warning=false;
    $('.mk-slider-description').each(function(i, elem) {
      workouts[i] = $(elem).text(); //$(this).text()
      if(workouts[i]!=lastquery[i].description){
        console.log('NO coinciden')
      }else{
        warning=true;
        console.log('SÍ coinciden')}
    })

    if(!warning){
      test.saveWorkouts(workouts,function(err,dataStored){
        if(err){
          res.status(500).send({message:`Error: ${err}`})
          console.log(`Error occurred: ${err}`)
        }
      })
      res.status(200).send({message:`Todo OK`})
    } else {
      res.status(500).send({message:`The content has been saved before`})
    }

  })// request fin
})


//WebSockets Logic
io.on('connection', function(socket){
  let vis=random.addVisit();
  console.log(random.getDate()+': '+vis.now);
  io.emit('newV',vis);

  socket.on('category',function(cat){
    //console.log(cat)
    test.getDataByCategory(cat,function(err,array){
      if(err) return res.status(500).send({message:`Error: ${err}`});
      if(array=="") return res.status(404).send({message:`No results`})
      socket.emit('category',array)
    })
  });

  socket.on('date',function(d){
    test.getDataByDate(random.structureDate(d.y,d.m,d.d),function(err,array){
      if(err) return res.status(500).send({message:`Error: ${err}`});
      if(array=="") return res.status(404).send({message:`No results`})
      socket.emit('date',array)
    })
  })

  socket.on('last',function(num){
    test.getLastEntry(num,function(err,array){
      //if(err) return res.status(500).send({message:`Error: ${err}`});
      if(err) console.log(`Error ${err}`)
      if(array=="") return res.status(404).send({message:`No results`})
      socket.emit('last',array)
    })
  })

  socket.on('testCX',function(){
    console.log('ping...')
    socket.emit('testCX','Pong');
  })

  socket.on('disconnect', function(){
    vis=random.decreaseVisit();
    console.log(random.getDate()+': '+vis.now);
    io.emit('newV',vis);
  });

}); //fin socket

module.exports = http //exportamos el servidor http (ya implementa express por debajo)
