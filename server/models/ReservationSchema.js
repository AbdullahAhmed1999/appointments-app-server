const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
    docId: String,
    patientId: String,
    reservation: Date,
    patient: String
})

const Reservation = mongoose.model("reservations", reservationSchema)
module.exports = Reservation