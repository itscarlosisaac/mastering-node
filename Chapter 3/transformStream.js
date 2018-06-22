const stream = require('stream');
let converter = stream.Transform();

converter._transform = function(data, enconding, cb){
  this.push(String.fromCharCode(new Number(data)) + "\n");
  cb();
}

process.stdin.pipe(converter).pipe(process.stdout)