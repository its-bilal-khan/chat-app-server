const express = require("express");
const socketSr = require("socket.io");
const http = require("http");
const cors = require('cors');

const {
    addUser, 
    removeUser, 
    getAllUsers, 
    getUser, 
    getUserInRoom
} = require('./users');

const {
    encodeString,
    decodeString,
    getMessage,
} = require('./helper');
const PORT = process.env.PORT || 5000;

const router = require("./router");


const app = express();

app.use(router)
app.use(cors())

const server = http.createServer(app);

const io = socketSr(server,{
    cors: {
        origin: '*',
    }
});

//Routes

io.on("connection", (socket)=>{

    console.log("we havee a new connection!!!!");

    socket.on("join", ({name, room}, callback)=>{
        console.log(name,room);
        const {error, user} = addUser({id:socket.id, name, room});
        
        if(error) return callback(error);
        socket.emit('message', getMessage({user:"admin", text:`${user.name}, welcome to the room`}));
        socket.broadcast.to(user.room).emit("message", getMessage({user:'admin', text:`${user.name}, has joind!`}))

        socket.join(user.room);

        callback();
    });

    socket.on("sendMessage", (message, callback)=>{
        console.log(decodeString(message));
        const user = getUser(socket.id);

        console.log(user, getAllUsers(),socket.id);
        socket.to(user.room).emit("message", getMessage({user:user.name, text:decodeString(message)}))
        callback();
    })
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        if(user)
        console.log(`${user.name} had left !!!!`);
    });
});


server.listen(PORT, ()=>console.log(`Server has starte on port ${PORT}`));