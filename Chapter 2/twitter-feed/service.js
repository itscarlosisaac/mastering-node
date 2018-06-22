const fs = require('fs');
const Twit = require('twit')

let twit = new Twit({
    consumer_key: 'XErdm95NzigCZ0eC77jtSGvUJ',
    consumer_secret: 'LhzbQ0Z4aNdlypyLlBWcbJlcN887bjIh8rKfn5ORdrAJPzWUSb',
    access_token: '99420618-jEASI2PRJOg3zSLgudfg9s9YPwDdgYLeAhMea9iqe',
    access_token_secret: 'bB11dZWj0swf6rIwXAEnRlqyz81Wif57tPnyDeg4lpfoR',
})

let tweetFile = "tweets.txt"
let writeStream = fs.createWriteStream( tweetFile, {
    flags: "a"
})

let cleanBuffer = function(len){
    let buf = Buffer.alloc(len);
    buf.fill('\0')
    return buf
}

let check = function(){
    twit.get('search/tweets', {
        q: 'nodejs since: 2013:01:01'
    }, (err, reply) => {
        console.log(twit)
        let buffer = cleanBuffer(reply.statuses.length * 140);
        reply.statuses.forEach( (obj, idx)  => {
            buffer.write(obj.text, idx*140, 140)
        })
        writeStream.write(buffer)
    } )
    setTimeout(check, 10000)
}

check();