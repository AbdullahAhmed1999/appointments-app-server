import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context";
import { useParams } from "react-router-dom";
import  Calendar from "react-calendar"
import {add, format} from "date-fns"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import './booking.css'


const Booking = () => {
    const {date, setDate, time, setTime, db, doc, setDoc, timesArray, settimesArray, reservation, setReservation, user,
         anotherUser, setAnotherUser, appointments} = useContext(DataContext)
    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    let once = true

    useEffect(() => {
        const doctor = db.find((doctor) => {
            return doctor._id == id})
            setDoc(doctor)
    }, [db])

    useEffect(() => {
        const name = localStorage.getItem("patient")
        console.log(name)
        if (name){
            setAnotherUser(JSON.parse(name))
        }
    }, [])


    useEffect(() => {
        const getting = () => {
        const beginning = add(date, {hours:parseFloat(timesArray.open)})
        const end = add(date, {hours: parseFloat(timesArray.close)})
        const interval = 15
        const timeArray = []
        for (let i = beginning; i <= end; i = add(i, {minutes: interval})){
            timeArray.push(JSON.stringify(i))
        }
        const check = appointments?.filter((appointment) => {
            return appointment.docId == id
        })
        const reservationArray = []
        check?.map((appointement) => {
            const newDate = new Date(appointement.reservation)
            reservationArray.push(JSON.stringify(newDate))
        })

        const filtered = timeArray?.filter((appointment) => {
            return !reservationArray.includes(appointment)
        })


        const array = []
        filtered.map((appointmant) => {
            array.push(JSON.parse(appointmant))
        })

        setTime(array)}
    
        timesArray && appointments && getting()
    }, [timesArray, date, appointments])

    useEffect(() => {
        if (doc?.hours !== undefined){
        const getTime = () => {
            once = false
            Object.entries(doc.hours).map(([day, time]) => {
                const dateDay = date.toLocaleDateString("en-US", {weekday: "long"})
                if (dateDay.toLowerCase() === day.toLowerCase()) {
                    settimesArray(time)
                    console.log(time)
                }
            })}   

        once && getTime();}
    }, [date, doc])
    
    const addReservation = async () => {
        let check 
        anotherUser ? check = {
            docId: doc._id,
            patientId: user._id,
            patient: anotherUser,
            reservation: reservation
        } : check = {
            docId: doc._id,
            patientId: user._id,
            patient: user.name,
            reservation: reservation
        }
        console.log(check)
        try{
            const response = await axiosPrivate.post("/reservation", check)
            if (response){
                console.log(response)
                localStorage.removeItem("patient")
                
            }
        }catch(err){console.log(err)}
    }

    


    
    return(
        <>
            <Calendar
            className={"react-calendar"}
            view="month"
            onChange={(e) => {
                once = true
                setDate(e)
            }}
            value={date}
            /* onClickDay={(e) => console.log(`onclickday ${e}`)} */
            />
            <button onClick={() => {
                    navigate("/appointments/current", {
                        state:{
                            previous: "/appointments/current"
                        }
                    })
                }}>to reservations page</button>
            {
                time &&
                time?.map((res, i) => (
                    <button className='rounded-sm bg-gray-100 p-2' key={i} onClick={() => {
                        console.log(res)
                        setReservation(res)
                    }}>
                        {format(res, "kk: mm")}
                    </button>
                ))
            }
            {
                reservation && 
                <div>
            <p>your reservation with doctor {doc.name} is at {
                format(reservation, 'PPPP p')} under the name of {
                    anotherUser ? anotherUser : user.name
                }</p>
                <button onClick={() => {
                    addReservation()
                }}>
                    confirm reservation
                </button>
        </div>
            }
            {/* <button onClick={() => {
                 navigate(`/confirmation/${doc._id}`, {
                    state: {
                        previous: `/confirmation/${doc._id}`
                    }
                })
            }}>
                confirm reservation
            </button> */}
        </>
    )
}

export default Booking