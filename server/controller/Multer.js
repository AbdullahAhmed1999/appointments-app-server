const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/image")
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }})

const uplaod = multer({
    storage: storage
})

module.exports = uplaod