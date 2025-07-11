const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generatePassword = async ()=>{
    const password = "Sumit@123"
    const hashed = await bcrypt.hash(password,10)
    console.log(hashed);
}
generatePassword()
exports.comparedPassword = (password,hashPassword)=>{
 return bcrypt.compare(password,hashPassword)
}
exports.generateToken = (payload,secret,expiresIn="1h") =>{
    return jwt.sign(payload,secret,{expiresIn})
}
exports.verifyToken = (token,secret)=>{
    try {
      return jwt.verify(token,secret)
    } catch (error) {
        console.log(error);
    }
}