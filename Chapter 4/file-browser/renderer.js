const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

Vue.component('listing', {
  props: ['item'],
  template: '<div @click="clicked(item.name)">{{item.name}}</div>',
  methods: {
    clicked(n){
      go(path.format({dir: app.location, base: n }));
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    location: process.cwd(),
    files: [],
    image: null
  },
  methods: {
    up() {
      go(path.dirname(this.location));
    }
  }
})

function go(p){
  if (
    p.endsWith(".bmp") ||
    p.endsWith(".png") ||
    p.endsWith(".gif") ||
    p.endsWith(".jpg")
  ) {
    app.image = "file://" + p // Show it
  } else {
    // Non image
    app.image = null;

    fs.lstatAsync(p).then( (stat) => {
      if( stat.isDirectory() ){
        app.location = p;
        fs.readdirAsync(app.location).then((files) => {
          var a = [];
          for ( let i = 0; i < files.length; i++  ) {
            a.push({id: i, name: files[i] });
            app.files = a;
          }
        }).catch(e => {
          console.log(e.stack)
        });
      }else {
        // Non a directory
      }
    }).catch( e => {
      console.log(e.stack)
    })
  }
}

go(app.location)