const mongoose = require("mongoose")

const ProvidersSchema = new mongoose.Schema({
    image : {
        imageName: String,
        imagePath: String
    },
    name: String,
    password: String,  
    email:  String,
    num:  Number,
    clinicNum:  Number,
    sex:  String,
    birth:  String,
    location: String,
    city:  String,
    hours: {
        sunday: {open: String, close: String},
        monday: {open: String, close: String},
        tuesday: {open: String, close: String},
        wednesday: {open: String, close: String},
        thursday: {open: String, close: String},
        friday: {open: String, close: String},
        saturday: {open: String, close: String},
      },
    exp:  String,
    specialty: String,
    grad:  String,
    gradYear: String,
    board:  String,
})

const File = mongoose.model("ProvidersTemps", ProvidersSchema)
module.exports = File
