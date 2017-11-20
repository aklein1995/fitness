
//(connect('http://localhost:3001',{'forceNew':true}));
var socket = io();

socket.on('newV',function(data){
  document.getElementById("visits").innerHTML=`
  Visitors now: ${data.now} // Today: ${data.day}`
})

socket.on('category', function(data){
  render(data);
})

socket.on('date', function(data){
  render(data);
})

socket.on('last',function(data){
  render(data);
})

socket.on('testCX',function(text){
  document.querySelector("#textCX").innerHTML=`${text}`
})

function reqLast(){
  let form = document.getElementById("lastForm");
  let num = form.elements[0].value;
  socket.emit('last',num);
}

function reqCategory(){
  let selected=document.getElementsByTagName("select")[0].value;
  socket.emit('category',selected);
}

function reqByDate(){
  let form = document.getElementById("dateForm");
  y=form.elements[0].value;
  m=form.elements[1].value;
  d=form.elements[2].value;

  socket.emit('date',{y,m,d})
  return false;
}

function reqTest(){
  socket.emit('testCX');
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

/*function getCategory(){
  let data=document.getElementById("sport");
  let option=document.getElementsByTagName("select")[0];
  alert(
    "\nMultiple:" + option.multiple +
    "\nLenght:" + option.size +
    "\nSelect Index:" + option.selectedIndex +
    "\nValue:" + option.value
  );
  if(option.value!='All'){
    data.setAttribute("action", "/aerobic/"+option.value);
  } else{
    data.setAttribute("action", "/aerobic");
  }
}*/
