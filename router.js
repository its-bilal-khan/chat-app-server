const express = require("express");
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res)=> {
    res.send("Server is up and running SOON YOU WILL BE ABLE TO SEE THE STATS");
});

router.get('/routes', (req, res)=> {
    fs.readFile('log.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
});
module.exports = router;