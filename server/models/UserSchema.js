const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email:  String,
    number:  Number,
    password: String, 
    refreshToken: String
})

const User = mongoose.model("users", UserSchema)
module.exports = User