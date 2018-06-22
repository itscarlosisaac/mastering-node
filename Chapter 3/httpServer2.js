const http = require('http');
const server = new http.Server();

server.on('connection', socket => {
  let now = new Date();
  console.log(`Client arrived at ${now}`);
  socket.on('end', () => console.log(`Client left at ${new Date()}`))
})

server.on('request', (request, response) => {
  request.setEncoding('utf8');
  request.on('readable', () => {
    let data = request.read();
    data && response.end(data)
  })
})

server.setTimeout(2000, socket => socket.end )
server.listen(8080)