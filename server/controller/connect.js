const mongoose = require("mongoose")

const Connect = () => {
    const api = "mongodb+srv://abdtnmeea:2091999Aa@cluster0.3yhnp2j.mongodb.net/DocApp?retryWrites=true&w=majority"
    try{
        mongoose.connect(api)
    }catch(err){console.log(err)}
}

module.exports = Connect