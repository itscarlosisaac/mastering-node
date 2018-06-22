const db = {
    getFullName: Promise.resolve('Jack Sparrow'),
    getAddress: Promise.resolve('The Dark Sea'),
    getFavorites: Promise.resolve('Compass')
}

Promise.all([
    db.getFullName,
    db.getAddress,
    db.getFavorites
])
.then( results => {
    console.log(results);
} )
.catch(err => {
    console.log(err)
})