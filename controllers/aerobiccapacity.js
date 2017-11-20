'use strict'

var aerobiccapacity= require('../schemas/aerobiccapacity.js');
var random = require('../random.js')
const category=['Aerobic Threshold','Lactate Threshold','VO2 MAX','Strength Endurance','Swim','Row','Bike'];

//GET Data
function getAllDatabase(cb){
  aerobiccapacity.find({},function(err,results){
    cb(err,results)
  })
}

//last Entrys
function getLastEntry(numlast,cb){
  aerobiccapacity.find({})
  .limit(Number(numlast)) //parse String to integer
  .sort({date:-1}) //-1 DESC --> last values entered
  .exec(cb)
}

//filtered by Category
function getDataByCategory(cat,cb){
  aerobiccapacity.find({category:cat},function(err,results){
    cb(err,results)
  })
};

//filtered by Date
function getDataByDate(date,cb){
  aerobiccapacity.find()
  .where('date').gt(date)
  .exec(cb)
}

//SET DATA
function saveWorkouts(workouts,cb){
  let d= new Date();
  for(var i=0;i<workouts.length;i++){
    let data= new aerobiccapacity();
    data.category=category[i];
    data.description=workouts[i];
    data.date=random.getDate();
    //console.log(typeof(data.date))
    data.save(cb);
  }
}

//DELETE
function deleteWorkouts(){

}

//COUNTS --> testing
function countWorkouts(cb){
  let conditions={
    category:'Aerobic Threshold',
    fecha:{
      day:{$gte:4},
      month:10,
      year:2017
    }
  };

  aerobiccapacity.find()
    .where('category').equals('Aerobic Threshold')
    .count(conditions,function(err,num){
      cb(err,num)
    })
}

module.exports= {
  getAllDatabase,
  getDataByCategory,
  getLastEntry,
  getDataByDate,
  saveWorkouts,
  countWorkouts
}

/*function getDataRow(callback){
  aerobiccapacity.find({category:"Row"}, function(err,res){
    if (!err) callback(err,res)
  })
}*/
