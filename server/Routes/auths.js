const express = require('express');
const Router = express.Router();

Router.get("/",function(req,res){
    res.send("Hello");
})

module.exports = Router