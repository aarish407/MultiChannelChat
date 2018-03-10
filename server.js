const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

// app.use(express.static('./public'))

app.get('/', function (req, res) {
    // res.sendFile('./index.html');
    res.sendFile('index.html', { root: __dirname });
});

server.listen(process.env.PORT || 3009, '0.0.0.0', function () {
    console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {
    console.log("Socket connection established");

    socket.on('clientHasJoined', function () {
       console.log("Client has joined with id= "+socket.id); 
    });

    socket.on('messageSent', function (msg) {
        io.emit('sendMessageToAllClients', {msg:msg, id:socket.id});
    })
});