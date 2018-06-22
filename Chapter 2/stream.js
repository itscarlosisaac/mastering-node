// Stream of data

let Readable = require('stream').Readable;

let r = new Readable;

let count = 0;

r._read = () => {
    count++
    return count > 10 ? r.push(null) : 
    setTimeout(() => r.push(count + '\n'), 500)
}
r.pipe(process.stdout)
// console.log(r)

