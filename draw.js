var express = require("express");
var app = express.createServer(express.logger());
var fs = require('fs');

app.get('/', function(request, response) {
  handler(request, response);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function handler (req, res) { 
 fs.readFile(__dirname + '/canvas.html', function (err, data) {
     if (err) { 
                res.writeHead(500);
         return res.end('Error loading chat.html'); 
            }
     res.writeHead(200);
     res.end(data); 
        });
}


var io = require('socket.io').listen(app);
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