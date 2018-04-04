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

var clients= [];

var numberOfClients= 0, admin;

setInterval(sendClientArrayToEveryone, 30);

io.on('connection', function (socket) {
    console.log("Socket connection established");

    socket.on('clientHasJoined', function (clientDetails) {
       console.log("Client has joined with id= "+socket.id);
    //    clients[numberOfClients]= clientDetails;

        clients.push(clientDetails);

       if(numberOfClients == 0)
       {
           admin= clientDetails;

           socket.emit('youAreTheAdmin');
       } 

       numberOfClients++;
    });

    socket.on('messageSent', function (msg) {
        io.emit('sendMessageToAllClients', {msg:msg, id:socket.id});
    })
});

function sendClientArrayToEveryone() {
    io.emit('recieveClientArray', clients);
}