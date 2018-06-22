const stream = require('stream');
let readable = new stream.Readable({
    encoding: 'utf8',
    highWaterMark: 16000,
    objectMode: true
})

// Basi implementation
let Feed = function(channel) {
    let readable = new stream.Readable({});
    let news = [
        "Big Win",
        'Stock Downs',
        "Michael Said"
    ];
    readable._read = () => {
        return news.length ? readable.push(news.shift() + "\n") : readable.push(null)
    }
    return readable;
}
let feed = new Feed();

feed.on('readable', () => {
    let data = feed.read();
    data && process.stdout.write(data)
})

feed.on("end", () => console.log("No more news"))

// Object implementation
let Feed_Object = function(channel){
    let readable = new stream.Readable({
        objectMode: true
    })
    let prices = [{price: 1}, {price: 2}]
    readable._read = () => {
        return prices.length ? readable.push(prices.shift()) : readable.push(null)
    }
    return readable;
}

let feed_obj = new Feed_Object();

feed_obj.on("readable", () => {
    let data = feed_obj.read();
    data && console.log(data)
})

feed_obj.on("end" , () => console.log("No more news object"))

// Byte contraint
let FeedByteConstrait = function(channel){
    let readable = new stream.Readable({});
    let news = "A long headline might go here.";
    readable._read = () => {
        readable.push(news)
        readable.push(null)
    }
    return readable;
}

let feed_const = new FeedByteConstrait();

feed_const.on('readable', () => {
    let char;
    while(char = feed_const.read(5)){
        console.log(char.toString());
    }
})


feed_const.on("end" , () => console.log("No more characters"))