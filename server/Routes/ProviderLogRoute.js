const express = require("express")
const Router = express.Router()
const uplaod = require("../controller/Multer")
const File  = require("../models/ProvidersTempSchema")
const Admin = require("../models/ProvidersSchema")

Router.post("/providers",uplaod.single("image"), async (req, res) => {
    const file = req.file
    const {name, email , password , num, clinicNum, sex , birth, location, city, hours, exp, specialty, grad, gradYear, board } = req.body

/*     if (!file){res.json(`file is required`)}
    if (!name){res.json(`name is required`)}
    if (!password){res.json(`password is required`)}
    if (!email){res.json(`email is required`)}
    if (!num){res.json(`number is required`)}
    if (!clinicNum){res.json(`clinic number is required`)}
    if (!sex){res.json(`sex is required`)}
    if (!birth){res.json(`birthday is required`)}
    if (!location){res.json(`location is required`)}
    if (!city){res.json(`city is required`)}
    if (!exp){res.json(`experience is required`)}
    if (!specialty){res.json(`specialty is required`)}
    if (!grad){res.json(`grad school is required`)}
    if (!gradYear){res.json(`graduation school is required`)}
    if (!board){res.json(`board is required`)}
    if (!hours){res.json(`hours are required`)} */
    const parsed = JSON.parse(hours)
    console.log(parsed)

    try{
        const Echeck = await File.findOne({email})
        if (Echeck){res.status(404).json(`your email ${email} is already registered`)}

        const Ncheck = await File.findOne({num})
        if (Ncheck){res.status(404).json(`your Number ${num} is already registered`)}

/*         const CNcheck = await File.findOne({clinicNum})
        if (CNcheck){res.status(404).json(`your Clinic Number ${clinicNum} is already registered`)}  */
        
        if (password.length < 8) {res.json(`the password must at least 8 digits`)}
        const check = {
      /*   image: {
            imageName: file.filename,
            imagePath:  file.path
        }, */
        name, email , password ,num/* , clinicNum, sex , birth, location, city, hours, exp, specialty, grad, gradYear, board */, hours: parsed
        }
        const response = await File.create(check)
    }catch(err){console.log(err)}
})

Router.get("/providers", async (req, res) => {
    try{
        const response = await File.find()
        if (response){
            res.json(response)
        }
    }catch(err){console.log(err)}
})



module.exports = Router