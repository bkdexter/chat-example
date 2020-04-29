var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// serve static content found in 'browser' folder
app.use(express.static('browser'));
// setup root request to serve index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/browser/index.html');
});

// create socket.io server and construct a simple client to broadcast incoming 'chat message' messages to all clients
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// create the simple http server
http.listen(port, function(){
  console.log('listening on *:' + port);
});
