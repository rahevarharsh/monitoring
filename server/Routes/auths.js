const express = require('express');
const Router = express.Router();
const trasport = require('../Mail/mail_auth')
const officaer = require('../Models/officaerschema')
const nodal = require('../Models/nodal_schema')
const otpData = require('../Models/otpSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authenticationOfficer = require('../Middleware/Authentication');
const authenticationNodal = require('../Middleware/AuthenticationNodal');
const case_schema = require('../Models/case_schema');
const dataInsertion = require('../TestCase/case_data');
const dataInsertionNodal = require('../TestCase/nodal_data');
const dataInsertionPolice = require('../TestCase/police_data');
const getNotification = require('../Func/getNotification');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
var useID = "";
var otpPars = 0;
let RollNameGlob
Router.get("/", function (req, res) {
    res.send("Hello");

})

Router.post("/login", async (req, res) => {
    // console.log(req.body);
    // dataInsertion()
    //    await dataInsertionNodal()
    //    await dataInsertionPolice()

    // Update code adding new Element in array
    /*case_schema.updateOne({ case_id: '1079' }, {
        $push: {
            notifications: [  {
                name: "Naresh",
                nodal_id: "1085",
                suggestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
            },{
                name: "Aryan",
                nodal_id: "1023",
                suggestion: "Use a door viewer before opening your door"
            }]
        }
    }, function (err) {
        if (err) {
            console.log(err);
        }
    })*/

    const { RollName, email, password } = req.body;
    if (RollName == "Nodal Officer") {
        const nodal_data = await nodal.findOne({ email })
        // console.log(await bcrypt.compare(password, officaer_data.password));
        if (nodal_data) {
            console.log("for nodal :" + await bcrypt.compare(password, nodal_data.password));
            if (await bcrypt.compare(password, nodal_data.password)) {
                const tokan = await nodal_data.generateAuthToken()
                await res.cookie("JWT_TOKEN", tokan, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                })
                console.log(tokan);
                res.status(200).json({ "message": "RollName" })
                RollNameGlob = RollName
            }
            else {
                res.status(401).json({ "Error": "wrong credentials" })
            }
        }

        else {
            res.status(401).json({ "Error": "wrong credentials" })
        }
    }
    else if (RollName == "Police Officer") {
        const officaer_data = await officaer.findOne({ email })
        // console.log(await bcrypt.compare(password, officaer_data.password));
        if (officaer_data) {
            if (await bcrypt.compare(password, officaer_data.password)) {
                const tokan = await officaer_data.generateAuthToken()
                await res.cookie("JWT_TOKEN", tokan, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                })
                req.RollName = RollName
                res.status(200).json({ "message": RollName })
                RollNameGlob = RollName
            }
            else {
                res.status(401).json({ "Error": "wrong credentials" })
            }
        }

        else {
            res.status(401).json({ "Error": "wrong credentials" })
        }
    }

})


Router.post("/register", async (req, res) => {
    console.log(req.body);
    const { RollName, email, password } = req.body;
    const hash_pass = await bcrypt.hash(password, 10);


    if (RollName == "Nodal Officer") {
        const InsertData = new nodal({ email, password: hash_pass });
        InsertData.save();
    }
    else if (RollName == "Police Officer") {
        const InsertData = new officaer({ email, password: hash_pass });
        InsertData.save();
    }


})

Router.post("/forgotpassword", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const Isexist = await officaer.findOne({ email });
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
        res.json({ "message": "officaer is not exist" })
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

Router.get("/pipage", authenticationOfficer, async (req, res) => {
    console.log("hello from PI back-end :" + req.RollName);
    let caseIDList = [];
    const cases = req.root_user.case_ids
    cases.map((obj) => { caseIDList.push(obj.case_id) })
    let caseArr = []
    getNotification(caseIDList).then(users => {
        users.map((obj, idx) => {
            caseArr[idx] = {
                fir_no: caseIDList[idx],
                suggestionsArr: obj.notifications
            }
            console.log(obj.notifications);
        })
        console.log(caseArr);

        res.send(caseArr)
    })

    // console.log(caseIDList);
    // let caseList = await getNotification(req,caseIDList)
    // for (let index = 0; index < caseIDList.length; index++) {
    //     parserArr[index] = {
    //         just: caseList[index],
    //         test_no: caseIDList[index]
    //     }
    // }
    // // console.log(await case_schema.find({case_id:caseIDList[0]}))
    // req.test = [{
    //     just: ["this is the test", "test2", 'test3'],
    //     test_no: 123645
    // },
    // {
    //     just: ["inspect fast", "send photos", 'upload raguler'],
    //     test_no: 123646
    // }
    //     ,
    // {
    //     just: ["fsdfsdf", "ewrsdf sdferse", 'ersadf sdaersar', 'loream is the fourth filed'],
    //     test_no: 123647
    // }
    // ]
    // req.parserArr = parserArr
    // dataForSend = [req.root_user, caseList]

    // // console.log(dataForSend);
    // console.log("fkjshdfj")
    // console.log(parserArr)
    // console.log('END');
    // console.log(req.parseArr);
    //  res.send(c)
})




Router.post("/detail", (req, res) => {
    console.log(req.body);

    res.send("ok this is vaild")
})

Router.get("/nodalpage", authenticationNodal, (req, res) => {
    res.send("hello world!")
})

Router.post('/api/pdf', (req, res) => {
    const pdf = req.file;
    console.log(pdf);
    // process the pdf file
  });

module.exports = Router