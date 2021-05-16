require('dotenv').config()
const app = require("./express-config");
const socketSr = require("socket.io");
const SocketController = require("./controllers/SocketController");

const http = require("http");
const mongoose = require('./db/MongoConfig');



const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketSr(server, {
    cors: {
        origin: '*',
    }
});
//Routes

SocketController.SocketConnect(io);


mongoose.connect(process.env.MONGO_CONNECTION_STRING_V2, { useUnifiedTopology: true}).then((result)=> {
    console.log("Db connected successfully");
    server.listen(PORT, ()=>console.log(`Server has starte on port ${PORT}`));
}).catch((e) => console.log(e));


