let repl = require('repl');
let net = require('net');
net.createServer( ( socket )  => {
    repl
    .start({
        prompt: "> ",
        input: socket,
        output:socket,
        terminal: true
    }).on('exit', () => {
        socket.end()
    })
}).listen(8080);