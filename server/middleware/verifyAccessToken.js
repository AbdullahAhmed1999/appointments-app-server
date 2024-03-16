const JWT = require("jsonwebtoken")
require("dotenv").config()

const verifyAccesToken = async (req, res, next) => {
    const headers = req.headers.authorization || req.headers.Authorization;
    if (!headers?.startsWith("Bearer")){
        return res.status(401)
    }
    const token = headers.split(" ")[1]
    JWT.verify(
        token,
        process.env.ACCESS_TOKEN_SERCRET,
        (err, decoded) => {
            if (err) res.status(403)
            console.log("VERIFication is working")
            next();
        })}

module.exports = verifyAccesToken