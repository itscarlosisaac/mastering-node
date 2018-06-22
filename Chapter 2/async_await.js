const db = {
    getFullName: Promise.resolve('Jack Sparrow'),
    getAddress: Promise.resolve('The Dark Sea'),
    getFavorites: Promise.resolve('Compass')
}


async function profile() {
    let fname = await db.getFullName;
    let address = await db.getAddress;
    let favs = await db.getFavorites;

    return [fname, address, favs]
}

profile().then( (res) => {
    console.log(res)
});