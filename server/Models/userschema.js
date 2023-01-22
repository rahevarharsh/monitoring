const mongoose = require( "mongoose");

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
            }
        }
    ]
})

const user=mongoose.model("official",userschema);

module.exports = user