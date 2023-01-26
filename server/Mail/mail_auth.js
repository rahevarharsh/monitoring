const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USERID,
        pass:process.env.PASS
    }
})