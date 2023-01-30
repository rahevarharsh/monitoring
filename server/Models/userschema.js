const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                data_jwt: {
                    type: String
                },
                expiresAt: {
                    type: Date
                }
            }
        }
    ]
})

userschema.methods.generateAuthToken = async function () {
    try {
        const len = this.tokens.length;
        const {token} = this.tokens[this.tokens.length - 1]
        // console.log(last_token);
        if (len === 0) {
            let jwt_token = jwt.sign({ _id: this._id }, process.env.SECRET)
            this.tokens = this.tokens.concat({ token: { data_jwt: jwt_token, expiresAt: (Date.now() + 18000000) } })
            const len = this.tokens.length;
            console.log(this.tokens[len - 1]);
            await this.save()
            return jwt_token
        }
        else if (token.expiresAt < Date.now()) {
            let jwt_token = jwt.sign({ _id: this._id }, process.env.SECRET)
            this.tokens = this.tokens.concat({ token: { data_jwt: jwt_token, expiresAt: (Date.now() + 18000000) } })
            await this.save()
            return jwt_token
            
        }
        else{
            return token.data_jwt
            // console.log(await jwt.verify(token.data_jwt,process.env.SECRET))
        }

    }
    catch (err) {
        console.log(err);
    }
}

const user = mongoose.model("official", userschema);

module.exports = user