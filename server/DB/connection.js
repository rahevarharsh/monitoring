const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connected :}");
}).catch(()=>{
    console.log("Not Connected :{");
})