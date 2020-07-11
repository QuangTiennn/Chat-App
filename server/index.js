const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;

const {addUser, removeUser, getUser, getUserInRoom} = require('./users');
const indexRouter = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket) => {
    console.log('user connected');
    socket.on('join', ({name, room}, callback)=> {
        const {error , user} = addUser({id : socket.id, name, room});
        if(error) return callback(error);
        socket.emit('message',{ user: 'admin', text: `${user.name}, well come to room ${user.name}`});
        socket.broadcast.to(user.room).emit('message',{ user : 'admin', text:`${user.name}, has joined !`});
        socket.join(user.room);
        callback();
    });
    socket.on('send message', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user : user.name, text: user.message});
        callback();
    });
    socket.on('disconnect',() => {
        console.log('user disconnected');
    });

});

app.use("/", indexRouter);
server.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
});