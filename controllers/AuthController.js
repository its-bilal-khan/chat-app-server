const models = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    async register (req, resp) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        
        const user = new models.User({
            name:req.body.name,
            email:req.body.email,
            password: password
        });

        user.save().then((result)=>{
            resp.status(200).send(result);
        }).catch((e)=>{
            resp.status(400)
            let errors = e.errors ? Object.keys(e.errors).map((key)=> key = e.errors[key].message) : e;
            resp.send(errors);
        })
    },
    async login(req, resp) {
        const user = await models.User.findOne({email: req.body.email}).select("name email password friendsId");
        if(!user) return resp.status(400).send("Email not found did you sign up");
        
        const validPass = await bcrypt.compare(req.body.password, user.password);
    
        if(!validPass) return resp.status(400).send("Incorrect password");
    
        const token = jwt.sign({user:user}, process.env.JWT_TOKEN);
        console.log(token)
        delete user.password;
        delete user.friendsId;
        resp.send({token, user});
    }
};