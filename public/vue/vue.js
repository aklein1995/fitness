Vue.component('movie',{
  props:['title'],
  template:`
  <div>
  <h2>{{title}}</h2>
  </div>
  `
})

new Vue({
  el: '#app', //elemento donde se va a aplicar
  data :{
    mostrar: true,
    mensaje: 'Hello World with Vue.js',
    imagen: "https://cdn-images-1.medium.com/max/2000/1*qnI8K0Udjw4lciWDED4HGw.png"
  },
  methods:{
    toggleMostrar: function(){
      this.mostrar=!this.mostrar;
    }
  }
})
