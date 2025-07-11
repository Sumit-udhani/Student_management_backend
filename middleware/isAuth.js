const { verifyToken } = require("../utils/hashedPassword");
require('dotenv').config()
module.exports = (req,res,next) =>{
    try {
        
        const authHeader = req.headers['authorization'];
        if (!authHeader||!authHeader.startsWith('Bearer')) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const token = authHeader.split(' ')[1];
        const decodeToken = verifyToken(token,process.env.JWT_LOGIN_SECRET_KEY)
        if (!decodeToken) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.userId = decodeToken.userId;
        req.email = decodeToken.email;
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
}