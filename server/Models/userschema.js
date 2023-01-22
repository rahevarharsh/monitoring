import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

const user=mongoose.model("official",userschema);

module.exports = user