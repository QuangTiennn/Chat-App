const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token_ = authHeader.split(' ');
    if(token_[0] !== 'Bearer'){
        res.json({
            err : 'token is valid'
        });
    }
    const token = token_[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};
