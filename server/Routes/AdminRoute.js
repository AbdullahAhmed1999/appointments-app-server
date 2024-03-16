const express = require("express")
const Router = express.Router()
const File = require ("../models/ProvidersTempSchema")
const Admin = require("../models/ProvidersSchema")


Router.post("/providers", async (req, res) => {
   /*  const {imageName, imagePath} = req.body.image */
    const {name, email , password , num,hours /* clinicNum, sex , birth, location, city, hours, exp, specialty, grad, gradYear, board  */} = req.body 
    const check = {
       /*  image: {
            imageName: imageName,
            imagePath:  imagePath
        }, */
        name, email , password ,num,/*  clinicNum, sex , birth, location, city, hours, exp, specialty, grad, gradYear, board */hours
        }
 /*        if (!imageName){res.json(`image name is required`)}
        if (!imagePath){res.json(`image path is required`)}
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
        console.log(hours)
    try{
        await Admin.create(check)
    }catch(err){console.log(err)} 
})

Router.delete("/providers/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try{
        await File.findByIdAndDelete(id)
    }catch(err){console.log(err)}
})

Router.get("/providers" , async (req, res) => {
    try{
        const response = await Admin.find()
        console.log(response)
        if (response){
            res.json(response)
        }
    }catch(err){console.log(err)}
})



module.exports = Router