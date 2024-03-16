const express = require("express")
const Router = express.Router()
const verifyAccessToken = require("../middleware/verifyAccessToken")
const Reservation = require("../models/ReservationSchema")

Router.post("/",verifyAccessToken, async (req, res) => {
    const {patientId, docId, patient, reservation} = req.body
    console.log({patientId, docId, patient, reservation})

    if (!patientId){res.status(404).json(`Patient id is not available`)}
    if (!docId){res.status(404).json(`Doctor id is not available`)}
    if (!patient){res.status(404).json(`patient name is not available`)}
    if (!reservation){res.status(404).json(`reservation time is not available`)}

    try{
        const response = await Reservation.create({
            patientId, docId, patient, reservation
        })
        if (response) {
            res.status(200).json(response)
        }
        console.log(response)
    }catch(err){console.log(err)}
} )

Router.get("/", async (req, res) => {
    try{
        const response = await Reservation.find()
        console.log(typeof(response))
        console.log(`this is the response ${response}`)
        if (response){
            res.json(response)
        }

    }catch(err){console.log(err)}
})

Router.delete("/:id", verifyAccessToken, async (req, res) => {
    const {id} = req.params
    console.log(id)
    try{
        await Reservation.findByIdAndDelete(id)
    }catch(err){console.log(err)}
})
module.exports = Router
