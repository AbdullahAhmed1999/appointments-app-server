const reservation = require("../models/ReservationSchema")
const cron = require("node-cron")

const sendNotification = async () => {
     try{
        console.log(`newDate ${new Date()}`)
        const response = await reservation.find()
        response.map((appointment) => {
            const newDate = new Date(appointment.reservation)
            const min = newDate.getMinutes()
            let minutes
            if (min !== 0) {
                minutes = `*/${min}`
            }else{
                minutes = 0
            }
            const hour = newDate.getHours()
            let hours
            if (hour !== 0) {
                hours = `*/${hour}`
            }else{
                hours = 0
            }
            const day = newDate.getDate() 
            let daysOfMonth = `*/${day}`
            const month = newDate.getMonth() 
            let months = `*/${month + 1} `
            const date = newDate.getDay() 
            let daysOfWeek
            if (date !== 0) {
                daysOfWeek = `*/${date}`
            }else {
                daysOfWeek = 7
            }
            let modifiedHour = `*/${hour -1}`
/*             console.log({minutes, hours, daysOfMonth, months, daysOfWeek})  */
            cron.schedule(`${minutes} ${hours} ${daysOfMonth} ${months} ${daysOfWeek}`, () => {
                console.log(appointment.patientId)
            }) 


        })
    }catch(err){console.log(err)} 
}

module.exports = sendNotification