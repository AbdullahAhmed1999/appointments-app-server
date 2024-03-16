const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const connect = require("./controller/connect")
const cookieParser = require("cookie-parser")
const cron = require("node-cron")
const sendNotification = require("./middleware/notofication")


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
app.use(cookieParser())
app.use(express.json())
app.use(require("./Routes/ProviderLogRoute"))
app.use("/admin", require("./Routes/AdminRoute"))
app.use("/user", require("./Routes/UserLogRoute"))
app.use("/Booking", require("./Routes/BookingRoute"))
app.use("/users", require("./Routes/AuthRoute"))
app.use("/refresh", require("./Routes/RefreshRoute"))
app.use("/reservation", require("./Routes/ReservationRoute"))
cron.schedule("*/1 * * * *", () => {
  sendNotification();
}) 


connect();


app.listen(port , () => console.log(`the server is running on port ${port}`))