const Stream = require('stream');

let writeable = new Stream.Writable({
    highWaterMark: 18000,
    decodeStrings: true
})

writeable._write = (chunk, encoding, cb) => {
    console.log(chunk.toString());
    console.log(encoding)
    cb();
}

let written = writeable.write(Buffer.alloc(100, '^_^ '));
writeable.end();

console.log(written)

let writeableDrained = new Stream.Writable({
    highWaterMark: 10
})

writeableDrained._write = (chunk, encoding, cb) => {
    process.stdout.write(chunk)
    cb();
}

function writeData(iterations, writer, data, encoding, cb) {
    (function write(){
        if(!iterations--) return cb();
        if(!writer.write(data, encoding)) {
            console.log(`<wait> highWaterMark of ${writeableDrained.writableHighWaterMark} reached.`);
            writer.once('drain', write )
        }
    })()
}

writeData(4, writeableDrained, 'String longer than highWaterMark', 'utf8', () => {
    console.log('finished');
})
