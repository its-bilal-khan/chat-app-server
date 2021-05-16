const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // console.log(req.header("Authorization"))
    if(req.originalUrl.includes('/api/auth')) 
    {
        next();
        return;
    }
    const token = req.header('Authorization');
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        // console.log(verified);
        req.user = verified;
        next();
    } catch (err) {
        res.status(404).send("Invalid Token");
    }

}