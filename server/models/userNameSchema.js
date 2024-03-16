const mongoose = require("mongoose")

const userNames = new mongoose.Schema({
    userId: String,
    patient: String
})

const userName = mongoose.model("userNmaes", userNames)
module.exports = userName