const { join } = require("path")
const { promisify } = require("util")
const fs = require("fs")
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

async function $readDir ( dir, acc = [] ) {
    await Promise.all(( await readdir(dir)).map(async file => {
        file = join(dir, file)
        return ( await stat(file)).isDirectory() && acc.push(file) && $readDir(file, acc)
    }))
    return acc
}

// $readDir(`../Chapter 1`)
// .then( dirInfo => {
//     console.log(dirInfo)
// })

// Pure promise replacement

function $readDir( dir, acc = []){
    return readdir(dir).then(files => Promise.all(files.map(file => {
        file = join(dir, file);
        return stat(file).then(fobj => {
            if ( fobj.isDirectory() ){
                acc.push(file);
                return $readDir(file, acc)
            }
        })
    })))
    .then( () => acc );
}
$readDir(`../Chapter 1`)
.then( (results) => {
    console.log(results)
})
