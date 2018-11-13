const fs = require('fs');
const path = require('path')
const { EventEmitter } =  require('events');

const ReadDirs = ( dir ) => {
  fs.readdir(dir, (error, list) => {
    if( list === undefined ){
      throw `Error, directory not found`
    }
    list.forEach(file => {
      fs.stat(path.join(dir, file), (error, stat) => {
        if( stat.isDirectory() ){
          return console.log(`Found directory: ${file}`)
        }
        console.log(`Found file: ${file}`)
      });
    });
  });
}

let walk = (dir, done) => {
  let results = {};
  let emitter = new EventEmitter;
  fs.readdir(dir, (err, list) => {
    let pending = list.length;
    if( err || !pending ){
      return done(err, results)
    }
    list.forEach(file => {
      let dfile = path.join(dir, file);
      fs.stat(dfile, (err, stat ) => {
        if(stat.isDirectory()){
          emitter.emit('directory', dfile, stat );
          return walk(dfile, (err, res) => {
            results[file] = res;
            !--pending && done(null, results);
          });
        }
        emitter.emit('file', dfile, stat );
        results[file] = stat;
        !--pending && done(null, results)
      })
    })
  })
  return emitter;
}

// ReadDirs('../Chapter 3')
walk('../Chapter 3', (err, res) => {
  // console.log(require('util').inspect(res, {depth: null, colors: true}));
})
.on('directory', (path, stat) => {
  console.log(`Directory: ${path} - ${stat.size}`);
})
.on('file', (path, stat) => {
  console.log(`File: ${path} - ${stat.size}`);
})