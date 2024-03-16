const express = require("express")
const Router = express.Router()
const userNmae = require("../models/userNameSchema")
const verifyAccesToken = require("../middleware/verifyAccessToken")


Router.post("/userName",verifyAccesToken, async (req, res) => {
    const {userId, patient} = req.body
    try{
        const check = await userNmae.find()
        const filter = check.filter((user) => {
            user.userId == userId
        })
        if (filter.length > 4){
            res.status(401).json("you already have added 4 users you must delete one of your previous users to be able to addd a new one")
        }
        const resposne = await userNmae.create({
            userId: userId,
            patient: patient
        })
        if (resposne){
            res.json(resposne)
        }
    }catch(err){console.log(err)}
})

Router.get("/userName", verifyAccesToken, async (req, res) => {
    try{
        const response = await userNmae.find()
        if (response){
            res.json(response)
        }
        if (!response){
            res.status(401).json(`something went wrong`)
        }
    }catch(err){console.log(err)}
})

module.exports = Router