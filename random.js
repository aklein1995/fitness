'use strict'

var visits={
  now: 0,
  day:0
};

function addVisit(){
  visits.now++;
  visits.day++;
  return visits;
}

function decreaseVisit(){
  visits.now--;
  return visits;
}

function structureDate(y,m,d){
  if(d<10)
    d=`0${d}`
  if(m<10)
    m=`0${m}`

  let fecha= `${y}${m}${d}`
  return fecha;
}

function getDate(){
  let fecha= new Date();
  let d= fecha.getDate();
  let m= fecha.getMonth()+1;
  let y= fecha.getFullYear();

  return structureDate(y,m,d);
}

function render(data){
  var html = data.map(function(value, index){
    return(`<div>
           <strong>${value.date}</strong><br/>
           <em>${value.category}</em><br/>
           ${value.description}
           </div>`);
  }).join(" ");
  document.querySelector('#result').innerHTML = html;
}

module.exports={
  addVisit,
  decreaseVisit,
  structureDate,
  getDate,
  render
}
