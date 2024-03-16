const express = require("express")
const Router = express.Router()
const jwt = require("jsonwebtoken")
const user = require("../models/UserSchema")
require('dotenv').config();

Router.get("/", async (req, res) =>{
    const cookie = req.cookies
    const refreshToken = cookie.refreshToken

    if (!refreshToken){
        res.status(404).json({
            accessToken: false
        })
    }

    const foundUser = await user.findOne({refreshToken})
    console.log(`user: ${foundUser}`)
    if (!foundUser){
        return res.status(403)
    }
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {return res.status(401).json({
                accessToken: false,
                user: false
            })}
            const accessToken = jwt.sign(
                {
                    "id": foundUser._id,
                    "number" : foundUser.number 
                },
                process.env.ACCESS_TOKEN_SERCRET, 
                {expiresIn: "15m"}
            )
            return res.json({
                accessToken: accessToken, 
                user: foundUser
            })
        })})

module.exports = Router