const express = require("express");

const router = express.Router();

router.get('/', (req, res)=> {
    res.send("Server is up and running SOON YOU WILL BE ABLE TO SEE THE STATS");
});

module.exports = router;