const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const readline = require('readline');

Vue.component('listing', {
  props: ['item', 'line'],
  template: '<div class="list-item" @click="clicked(item.name)">{{item.name}}</div>',
  methods: {
    clicked(n){
      go(path.format({dir: app.location, base: n }));
    }
  }
});

Vue.component('app-line', {
  props: ['line'],
  template: '<p>{{line}}</p>',
  methods: {
  }
});

var app = new Vue({
  el: '#app',
  data: {
    location: process.cwd(),
    files: [],
    image: null,
    lines: []
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
  let data = [];
  return new Promise( (resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity
    });
    rl.on('line', line => { data.push(line)});
    rl.on('close', line => { resolve(data) });
  });
}

function go(p){
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
        showContent(p).then((data) => {
          app.lines = data;
        });
      }
    }).catch( e => {
      console.log(e.stack)
    })
  }
}




go(app.location)