var io = require('socket.io').listen(8000);

io.sockets.on('connection', function (socket) {
  
  socket.on('draw', function (data) {
    console.log(data);
    socket.broadcast.emit('clientDraw' ,data);
  }); 
});