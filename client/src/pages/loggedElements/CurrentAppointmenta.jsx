import React from "react"
import { useContext } from "react"
import DataContext from "../../context"
import { useEffect } from "react"
import {format} from "date-fns"
import axios from "../../axios"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"

const CurrentAppointments = () => {
    const {user, appointments, currentAppointments, setCurrentAppointments} = useContext(DataContext);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    useEffect(() => {
        const filtering = () => {
            const newDate = new Date()
            const response = appointments?.filter((appointment) => {return appointment.patientId == user._id})
            const current = response?.filter((appointment) => {
                const reserv = new Date(appointment.reservation)
                if  (reserv >= newDate) {
                    return reserv
                }
            })
            const modified = current?.map((appointment) => {
                const newDate = format(appointment.reservation, 'yyyy-MM-dd HH:mm')
                const object = {...appointment, reservation: newDate}
                return object
            })
            console.log(modified)
            setCurrentAppointments(modified)
        }

        appointments && filtering()    
    }, [appointments])

    const  deleteAppointment = async (id) => {
        try{
            await axiosPrivate.delete(`/reservation/${id}`)
        }catch(err){console.log(err)}
    }
    return(
        currentAppointments && currentAppointments?.map((appointment, i) => (   
            <div key={i}>
                <h1>{appointment.patient}</h1>
                <h3>{`your appountment at ${appointment.reservation}`}</h3>
                <button onClick={() => {
                    deleteAppointment(appointment._id)
                }}>delete appointment</button>
                <button
                    onClick={() => {
                        navigate(`/Doc/${appointment.docId}`, {
                            state: {
                                previous: `/Doc/${appointment.docId}`
                            }
                        })
                    }}
                >see your provider</button>
            </div>
            
        ))
    )
}

export default CurrentAppointments