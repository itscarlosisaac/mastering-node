const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

Vue.component('listing', {
  props: ['item'],
  template: '<div class="list-item" @click="clicked(item.name)">{{item.name}}</div>',
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
    image: null,
    content: null
  },
  methods: {
    up() {
      go(path.dirname(this.location));
    }
  }
})


function isImage(name){
  const ext = /[^.]+$/.exec(name)[0].toLowerCase();
  const imagesFormat = ['bmp', 'jpg', 'jpeg', 'tiff', 'png'];
  return imagesFormat.includes(ext);
}

function showContent(file){
  return fs.readFileSync(file, 'utf8', (err, data) => {
    return data;
  });
}

function go(p){
  console.log( isImage(p) )
  if ( isImage(p) ) {
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
        // File content
        let content = showContent(p);
        console.log(content)
        app.content = content;
      }
    }).catch( e => {
      console.log(e.stack)
    })
  }
}




go(app.location)