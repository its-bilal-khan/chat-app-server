
const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./router");
const routes = require("./routes");
const verifyTokenMiddleWare = require('./middlewares/VerifyToken');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

const app = express();

app.use(router)
app.use(cors(corsOptions))
app.use(verifyTokenMiddleWare);
app.use(bodyParser.json());// DEPRICATED
app.use(express.static('Videos'));

app.use("/", routes);

module.exports = app;