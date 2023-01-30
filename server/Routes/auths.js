const express = require('express');
const Router = express.Router();
const trasport = require('../Mail/mail_auth')
const user = require('../Models/userschema')
const otpData = require('../Models/otpSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authentication = require('../Middleware/Authentication')
var useID = "";
var otpPars = 0;
Router.get("/", function (req, res) {
    res.send("Hello");
})
Router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { RollName, email, password } = req.body;
    const user_data = await user.findOne({ email })
    // console.log(await bcrypt.compare(password, user_data.password));
    if (await bcrypt.compare(password, user_data.password)) {
        const tokan = await user_data.generateAuthToken()
        await res.cookie("JWT_TOKEN", tokan,{
            expires:new Date(Date.now()+500000),
            httpOnly:true
        })
        res.status(200).json({ "message": "Welcome back!" })
    }
    else {
        res.status(401).json({ "Error": "wrong credentials" })
    }
})


Router.post("/register", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const hash_pass = await bcrypt.hash(password, 10);
    const InsertData = new user({ email, password: hash_pass });
    InsertData.save();
})

Router.post("/forgotpassword", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const Isexist = await user.findOne({ email });
    useID = email;
    if (Isexist) {
        const otp = (Math.round(Math.random() * 9000) + 1000).toString();
        otpPars = otp;
        const mailOptions = {
            from: process.env.USERID,
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            html: `<h2>OTP for reset password</h2><p>your otp is ${otp},it will expire in 15 minutes and do't share it!</p>`
        }

        await trasport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Mail Sended !");
            }
        })
        const hashOTP = await bcrypt.hash(otp, 10)
        const NewOtp = new otpData({
            email: email,
            otp: hashOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60000
            // 900000
        })
        await NewOtp.save();
        res.status(200).json({ "message": "OTP sended !" })
    }
    else {
        res.status(400).json({ "error": "Bad requiest" })
    }

})

Router.post("/otp", async (req, res) => {
    console.log(req.body);
    if (!useID) {
        console.log("Invalide attempt!");
    }
    const data = await otpData.find({ email: useID })

    if (!data) {
        res.json({ "message": "user is not exist" })
    }
    else {
        // verify
        if (data[data.length - 1].expiresAt < Date.now()) {
            res.json({ "TimeOut": "Try agin" })
            await otpData.deleteMany({ email: useID })
        }
        else {
            if (await bcrypt.compare(req.body.otp, data[data.length - 1].otp)) {
                res.status(200).json({ "message": "Verified !" });
                await otpData.deleteMany({ email: useID })
            }
            else {
                res.status(400).json({ "Error": "Invalid OTP !" })
            }
        }
    }
})

Router.post("/resend", async (req, res) => {
    console.log(req.body);
    console.log(otpPars);
    const last_otpData = await otpData.find({ email: req.body.parseEmail });
    if (last_otpData[last_otpData.length - 1].expiresAt < Date.now()) {

        await otpData.deleteMany({ email: req.body.parseEmail })
        const otp = (Math.round(Math.random() * 9000) + 1000).toString();
        const mailOptions = {
            from: process.env.USERID,
            to: useID,
            subject: 'Sending Email using Node.js',
            html: `<h2>OTP for reset password</h2><p>your otp is ${otp},it will expire in 15 minutes and do't share it!</p>`
        }

        await trasport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Mail Sended !");
            }
        })
        const hashOTP = await bcrypt.hash(otp, 10)
        const NewOtp = new otpData({
            email: useID,
            otp: hashOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 900000
        })
        await NewOtp.save();
        res.status(200).json({ "message": "OTP Resended !" })


    }
    else {

        const mailOptions = {
            from: process.env.USERID,
            to: useID,
            subject: 'Sending Email using Node.js',
            html: `<h2>OTP for reset password</h2><p>your otp is ${otpPars},it will expire in 15 minutes and do't share it!</p>`
        }
        await trasport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Mail Resended !");
            }
        })


    }

})

Router.get("/pipage", authentication, (req, res) => {
    console.log("hello from PI back-end");
    res.send(req.root_user)
})

module.exports = Router