const fs = require('fs');
fs.watch(__filename, { persistent: false }, (e , filename) => {
    console.log(e);
    console.log(filename)
})

setImmediate( function () {
    fs.rename(__filename, __filename + '.new', () => {})
})

// let w = fs.watch('file', () => {})
// w.close();