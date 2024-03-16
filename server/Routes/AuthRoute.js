const express = require("express")
const Router = express.Router()
const verifyAccesToken = require("../middleware/verifyAccessToken")

Router.get("/", verifyAccesToken, async (req, res) => {
    res.json(`access token is available`)    
})  

module.exports = Router