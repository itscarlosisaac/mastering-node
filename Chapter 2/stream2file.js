// Stream of data to file

const fs = require('fs');
const Readable = require('stream').Readable;

let r = new Readable;

let count = 0;

r._read = () => {
    count++
    return count > 10 ? r.push(null) : 
    setTimeout(() => r.push(count + '\n'), 500 )
}

const w = fs.createWriteStream('./counter.txt', {
    flags: 'w', 
    mode: 0666
});

r.pipe(w)