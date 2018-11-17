const io = require('socket.io').listen(8080);

io.sockets.on('connection', socket => {
  let id = socket.id;

  socket.on('mousemove', data => {
    data.id = id;
    socket.broadcast.emit('moving', data);
  })

  socket.on('diconnect', () => {
    socket.broadcast.emit('clientdisconnect', id);
  });
});