const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// serve static content found in 'browser' folder
app.use(express.static(path.resolve(__dirname, '../client/build')));

// setup additional http server routes here (ie: /api for REST)

// setup default request to serve index.html
app.get('*', function (_req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

var iUserCount = 0;

// create socket.io server and construct a simple client to broadcast incoming 'chat message' messages to all clients
io.on('connection', function (socket) {
    socket.username = "Guest#"+iUserCount++;
    console.log("socket connected: id=", socket.id, socket.username);

    // all clients join general chat
    socket.join('general', () => {
        io.to('general').emit('chat message', {
            sender: 'Server',
            room: 'general',
            msg: socket.username+' has joined'
        });
    });

    // when any socket sends the server a chat message, broadcast to all clients that same message
    socket.on('chat message', function (e) {
        io.to(e.room).emit('chat message', {
            sender: socket.username,
            room: 'general', 
            msg: e.msg
        });
    });

    socket.on('set name', (username) => {
        // save the user name
        socket.username = username;

        // broadcast to other clients the new user info
        socket.broadcast.emit('user joined', {
            id: socket.id,
            username: socket.username,
        });

    });
});

// create the simple http server
http.listen(port, function () {
    console.log(`listening on *: ${port}`);
});