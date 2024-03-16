const express = require("express")
const Router = express.Router()
const User = require("../models/UserSchema")
const JWT = require("jsonwebtoken")
require("dotenv").config()

Router.post("/", async (req, res) => {
    const {userName, userEmail, userNumber, userPassword} = req.body
    if (!userName){res.status(401).json("user name is required")}
    if (!userEmail){res.status(401).json("user email is required")}
    if (!userNumber){res.status(401).json("user number is required")}
    if (!userPassword){res.status(401).json("user password is required")}
    if (userPassword.length <= 8){res.status(401).json("the password must at least be 8 charecters")}

    try{
        const check = await User.findOne({email : userEmail})
        if (check){
            res.status(409).json(`this email is already being used`)
        }
        const checkNumber = await User.findOne({number : userNumber})
        if (checkNumber){
            res.status(409).json(`this number is already being used`)
        }

        const accessToken = JWT.sign(
            {
                "number" : userNumber 
            },
            process.env.ACCESS_TOKEN_SERCRET, 
            {expiresIn: "15m"}
        )
        const refreshToken = JWT.sign(
            {
                "number" : userNumber  
            },
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: "24hr"}
        )
        const response = await User.create({
            name: userName, email: userEmail, number: userNumber, password: userPassword, refreshToken: refreshToken
        })
            console.log(refreshToken)
        if (response){
            res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            res.json({
                user: response,
                accessToken: accessToken
            })         
        } 
        if (!response){
            res.status(404).json("something went wrong")
        }
    }catch(err){console.log(err)}
})

Router.post("/Elog", async (req, res) => {
    const {userEmail, userPassword} = req.body
    if (!userPassword){res.status(401).json("user password is required")}
    if (!userEmail){res.status(401).json("user email is required")}
    if (userPassword.length < 8){res.status(401).json("the password must at least be 8 charecters")}

    try{
        const response = await User.findOne({email: userEmail})
        if (!response){res.status(409).json("this email is not registered")}
        const accessToken = JWT.sign(
            {
                "number" : response.number 
            },
            process.env.ACCESS_TOKEN_SERCRET, 
            {expiresIn: "15m"}
        )
        const refreshToken = JWT.sign(
            {
                "number" : response.number  
            },
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: "24hr"}
        )
            console.log(refreshToken)
        if (response.password === userPassword){
            await User.findOneAndUpdate({email: userEmail}, {refreshToken : refreshToken})
            res.cookie('jwt', JSON.stringify(refreshToken) , { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
            res.json({
                user: response,
                accessToken: accessToken
            })         
        } 
        if (response.password !== userPassword){
            res.status(401).json("the password you added was wrong")
        }

    }catch(err){console.log(err)}
})

Router.post("/Nlog", async (req, res) => {
    const {userNumber, userPassword} = req.body
    if (!userPassword){res.status(401).json("user password is required")}
    if (!userNumber){res.status(401).json("user number is required")}
    if (userPassword.length < 8){res.status(401).json("the password must at least be 8 charecters")}
    console.log(`number ${userNumber, userPassword}`)

    try{
        const response = await User.findOne({number: userNumber})
        console.log(`response ${response}`)
        if (!response){res.status(401).json("this phone number is not registered")}
        const accessToken = JWT.sign(
            {
                "number" : response.number 
            },
            process.env.ACCESS_TOKEN_SERCRET, 
            {expiresIn: "15m"}
        )
        const refreshToken = JWT.sign(
            {
                "number" : response.number  
            },
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: "24hr"}
        )
        console.log(`access ${accessToken}`)
        console.log(`refresh ${refreshToken}`)
        if (response.password === userPassword){
            await User.findOneAndUpdate({number: userNumber}, {refreshToken : refreshToken})
            res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            res.json({
                user: response,
                accessToken: accessToken
            })         
        } 
        if (response.password !== userPassword){
            res.status(401).json("the password you added was wrong")
        }
    }catch(err){console.log(err)}
})

module.exports = Router