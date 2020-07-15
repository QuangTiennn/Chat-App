require ('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const morgan = require('morgan'); 

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const indexRouter = require('./Router/router');
const mongoose  = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true, 
    useNewUrlParser: true })
    .then(function(){
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extends : true
        })
    );
    app.use(cors());
    app.use(express.static('public'));
    console.log('DB is running');
    
    io.on('connection',(socket) => {
        console.log('user connected');
    
        socket.on('join', ({name, room}, callback)=> {
            const {error , user} = addUser({id : socket.id, name, room});
            if(error) return callback(error);
            socket.join(user.room);
            // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
            callback();
        });
    
        socket.on('sendMessage', (message,callback) => {
            const user = getUser(socket.id);
            io.to(user.room).emit('message', { user: user.name, text: message });
            callback();
        });
    
        socket.on('disconnect',() => {
            console.log('user disconnected');
        });
    });
    
    app.use("/api", indexRouter);
    server.listen(port,()=>{
        console.log(`server is running on port : ${port}`);
    });
});

