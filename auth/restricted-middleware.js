const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const currentUser = req.subject;
    if(token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if(error){
                res.status(401).json({ message: "Invalid Credentials" })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "no token provided" })
    }
};