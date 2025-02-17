const jwt = require('jsonwebtoken');

const authenticateAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if(!token)
            return res.sendStatus(401);
        
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = authenticateAccessToken;