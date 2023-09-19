const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
        origin: "http://localhost:8080"
    } });

app.get('/', (req, res) => {
    res.send('ok');
});

app.listen(3000, async() => {
    console.log('listening');
});

let chatData = [];

io.on("connection", (socket) => {
    chatData.push({user: 'Системное', message: 'Клиент был успешно подключен', });
    socket.emit('connection', {
        message: 'Вы успешно подключены',
        chatData: chatData,
    });

    socket.on('message', (arg) => {
        chatData.push(arg);
        socket.emit('updateData', {
            chatData,
        });
    });

    socket.on('disconnect', (reason) => {
        chatData.push({user: 'Системное', message: 'Клиент был отключён'});
    });


});

httpServer.listen(3001);