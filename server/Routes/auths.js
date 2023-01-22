const express = require('express');
const Router = express.Router();

const user = require('../Models/userschema')

Router.get("/",function(req,res){
    res.send("Hello");
})
Router.get("/login",(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    const InsertData = new user({email,password});
    InsertData.save();
})

module.exports = Router