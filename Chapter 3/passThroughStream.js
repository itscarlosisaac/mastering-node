const fs = require('fs')
const stream = require('stream')
const spy = new stream.PassThrough()

spy
  .on('error', err => console.log(err))
  .on('data', function (chunk) {
    console.log(`spied data > ${chunk}`)
  })
  .on('end', () => console.log('\nFinished.'));

fs.createReadStream('./passThroughStream.txt').pipe(spy).pipe(process.stdout)