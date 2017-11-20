'user strict'

var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AerobicSchema = Schema({
  category: { type: String, enum:['Aerobic Threshold','Lactate Threshold','VO2 MAX','Strength Endurance','Swim','Row','Bike'] },
  description: String,
  date: {type: Number, min:20171000, max:20500000}
})

module.exports= mongoose.model('Aerobiccapacity', AerobicSchema);
