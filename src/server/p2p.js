const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

var initP2PServer = function (socketPort) {
    console.log('Server p2p open port: ' + socketPort);
    let server = http.createServer(app).listen(socketPort);
    let io = socketio.listen(server);
    initMessageHandler(io);
}

var initMessageHandler = function (socketIO) {
    // handler event socket
    socketIO.on('connection', function (socket) {
        // send data to event listen 'news'
        socket.emit('news', {
            hello: 'world'
        })
    });
}



// initP2PServer(8000);