const jwt = require('jsonwebtoken')
const nodal = require('../Models/nodal_schema')
const authenticationNodal = async(req,res,next)=>{
    try {
       const token = await req.cookies.JWT_TOKEN
       const verify_user = jwt.verify(token,process.env.SECRET)
       const root_user = await nodal.findOne({_id:verify_user})
       if (root_user) {
        req.token = token
        req.root_user = root_user
        req.root_userID = root_user._id
        console.log('In Nodal');
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

module.exports = authenticationNodal