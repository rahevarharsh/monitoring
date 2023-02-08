const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const app = express();
const multer = require('multer');
app.use(cookieParser())
dotenv.config({path:"./config.env"})
app.use(express.json())
require("./DB/connection")
mongoose.set('strictQuery', false);

const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(require("./Routes/auths"));


app.listen(5000,function(req,res){
    console.log("runing at 5000!");
})