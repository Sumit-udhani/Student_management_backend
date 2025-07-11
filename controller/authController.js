const { User } = require('../models');
const { comparedPassword, generateToken } = require('../utils/hashedPassword')

exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({
            where:{email}
        })
        if (!user) {
            return res.status(401).json({message:'User not found'})
        }
        const isPasswordMatch  = await comparedPassword(password,user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({message:'Invalid password'})
        }
        const token = generateToken({
            userId:user.id,
            email:user.email
        },process.env.JWT_LOGIN_SECRET_KEY)
        return res.status(200).json({
            message:"Login successfull",
            token,
            userId:user.id,
            email:user.email,

        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}