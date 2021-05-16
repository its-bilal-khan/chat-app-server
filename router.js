const express = require("express");
const fs = require('fs');
const models = require('./models');
const router = express.Router();

router.get('/', async (req, res)=> {
    // const updatedUser = await models.User.findOneAndUpdate({_id:"605112a8517f4b1290346f2a"}, {$push:{friendsId :"60575f2342f17c4a986a2cfd"}})
    console.log("getUp")
    const users = await models.User.find({
        $and: [
            { 
                // friendsId:{$elemMatch: {$eq: req.query.id }},
                $or:[
                    {
                        name:{ 
                            $regex: '.*' + req.query.search + '.*' 
                        }
                    },
                    {
                        email:{ 
                            $regex: '.*' + req.query.search + '.*' 
                        }
                    }
                ],  
            },
        ],
        
    })
    .populate({path:"friends", select:"name email", })
    .select("name email friends friendsId");
    
    res.send(users);
});

router.get('/logs', (req, res)=> {
    fs.readFile('log.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
});
module.exports = router;