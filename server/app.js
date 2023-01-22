const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
dotenv.config({path:"./config.env"})

require("./DB/connection")
app.use(require("./Routes/auths"));


app.listen(5000,function(req,res){
    console.log("runing at 5000!");
})