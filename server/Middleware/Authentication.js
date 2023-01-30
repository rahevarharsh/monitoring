const jwt = require('jsonwebtoken')
const user = require('../Models/userschema')
const authentication = async(req,res,next)=>{
    try {
       const token = await req.cookies.JWT_TOKEN
       const verify_user = jwt.verify(token,process.env.SECRET)
       const root_user = await user.findOne({_id:verify_user})
       if (root_user) {
        req.token = token
        req.root_user = root_user
        req.root_userID = root_user._id
        console.log('INININI');
        next()
       }
       else{
        throw new Error('User not found')
       }
    } catch (error) {
        res.status(401).json({"Error":"Unauth"})
        console.log(error);
    }
}

module.exports = authentication