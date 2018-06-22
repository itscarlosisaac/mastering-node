const events = require('events');

function getEmitter() {
    let emitter = new events.EventEmitter();
    // emitter.emit('start');
    process.nextTick(() => {
        emitter.emit('start');
    })
    return emitter;
}

let myEmitter = getEmitter();

myEmitter.on("start", () => {
    console.log("Started");
})

// Ref and unref


setTimeout(() => {
    console.log("now stop")
}, 100)

let intervalId = setInterval(() => {
    console.log("running")
}, 1)

intervalId.unref();