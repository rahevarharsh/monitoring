const jwt = require('jsonwebtoken')
const officaer = require('../Models/officaerschema')
const nodal = require('../Models/nodal_schema')

const authenticationOfficer = async (req, res, next) => {
    try {
        const token = await req.cookies.JWT_TOKEN
        const verify_user = jwt.verify(token, process.env.SECRET)
        const root_user_officaer = await officaer.findOne({ _id: verify_user })


        if (root_user_officaer) {
            req.RollName = "Police Officer"
            req.token = token
            req.root_user = root_user_officaer
            req.root_userID = root_user_officaer._id
            console.log('INININI Officer');
            next()
        }
        else {
            throw new Error('User not found')
        }
    } catch (error) {
        res.status(401).json({ "Error": "Unauth" })
        console.log(error);
    }
}

module.exports = authenticationOfficer