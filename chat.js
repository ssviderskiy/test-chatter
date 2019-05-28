const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const log4js = require('log4js');
const logger = log4js.getLogger();

const port = 4444;

logger.debug('Chatter: Start running');

server.listen(port);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    let name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name);

    logger.info(name + ' connected to chat!');
    socket.emit('userName', name);

    socket.on('message', (msg) => {
        logger.warn('User: ' + name + ' | Message: ' + msg);
        logger.warn('=Sending message to other chaters...');
        io.sockets.emit('messageToClients', msg, name);
    });
});