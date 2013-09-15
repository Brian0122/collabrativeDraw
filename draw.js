var port = process.env.PORT || 5000;
var io = require('socket.io').listen(port);
// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
io.sockets.on('connection', function (socket) {
  
  socket.on('draw', function (data) {
    console.log(data);
    socket.broadcast.emit('clientDraw' ,data);
  }); 
});