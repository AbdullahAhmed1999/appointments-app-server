import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "./axios";




const DataContext = createContext({})

export const DataProvider = ({children}) => {

    /* this is the states of ProvidersLog */
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [num, setNum] = useState("")
    const [clinicNum, setClinicNum] = useState("")
    const [img, setImg] = useState("")
    const [city, setCCity] = useState("")
    const [location, setLocation] = useState("")
    const [sex, setSex] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [birth, setBirth] = useState("")
    const [grad, setGrad] = useState("")
    const [gradYear, setGradYear] = useState("")
    const [exp, setExp] = useState("")
    const [board, setBoard] = useState("")
    const [doc, setDoc] = useState("")
    const [hours, setHours] = useState({
        sunday: {open: "", close: ""},
        monday: {open: "", close: "",},
        tuesday: {open: "", close: "",},
        wednesday: {open: "", close: "",},
        thursday: {open: "", close: "",},
        friday: {open: "", close: "",},
        saturday: {open: "", close: "",}
    })

    /* this is the states of Providers in the home page and admin */
    const [temProviders, setTemProviders] = useState([])
    const [db, setDB] = useState([])
    const [provider, setProvider] = useState(null)

    /* this is the states of Client Appointment */
    const [anotherUser, setAnotherUser] = useState("")
    const [allUsers, setAllUsers] = useState("")
    const [check, setCheck] = useState(false)
    
    /* this is the states of Client Log and Sign */
    const [userName, setUserName] = useState(false)
    const [userEmail, setUserEmail] = useState(false)
    const [userPassword, setUserPassword] = useState(false)
    const [userNumber, setUserNumber] = useState(false)
    const [checkUserName, setCheckUserName] = useState(false)
    const [checkUserPassword, setCheckUserPassword] = useState(false)
    const [checkUserNumber, setCheckUserNumber] = useState(false)
    const [checkTwo, setCheckTwo] = useState(false)
    const [auth, setAuth] = useState(false)
    const [authCheck, setAuthCheck] = useState(false)
    const [user, setUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


/* this is the states of CALENDAR*/
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(false)
    const [timesArray, settimesArray] = useState(false)
    const [reservation, setReservation] = useState(false)
    const [appointments, setAppointments] = useState(false)
    const [currentAppointments, setCurrentAppointments] = useState(false)




/* this is the code for ProvidersLog */
        const ProviderLog = async () => {
            const formData = new FormData()
            formData.append("image", img)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("num", num)
            formData.append("clinicNum", clinicNum)
            formData.append("sex", sex)
            formData.append("birth", birth)
            formData.append("location", location)
            formData.append("city", city)
            formData.append("specialty", specialty)
            formData.append("exp", exp)
            formData.append("grad", grad)
            formData.append("gradYear", gradYear)
            formData.append("board", board)
            formData.append("hours",JSON.stringify(hours))
            console.log(hours)
            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                }
            }
            try{
                const res = await axios.post("/providers", formData, config)
                console.log(res.data)
            }catch(err){console.log(err)}
        }

/* this is the code for Admin confirmation */

     useEffect(() => {
        const ProvidersConfirm = async () => {
            try{
                const res = await axios.get("providers")
                setTemProviders(res.data)
            }catch(err){console.log(err)}
        }
        ProvidersConfirm();
    }, []) 




    const accept = async (Provider) => {      
        const id = Provider._id
        console.log(id)
        try{
            await axios.post("/admin/providers", Provider) 
        }catch(err){console.log(err)}
    }

    const reject = async (Provider) => {
        const id = Provider._id
        try{
            await axios.delete(`/admin/providers/${id}`)
        }catch(err){console.log(err)}
    }



    return(
        <DataContext.Provider value={{
            /* this is the states of ProvidersLog */
            name, setName, email, setEmail, password, setPassword, num, setNum, clinicNum, setClinicNum, img, setImg, city, setCCity,
            location, setLocation, sex, setSex, specialty, setSpecialty, birth, setBirth, grad, setGrad, gradYear,
            setGradYear, exp, setExp,board, setBoard, ProviderLog, hours, setHours,

             /* this is the states of Client Log and Sign */
            userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword, userNumber, setUserNumber, 
            checkTwo, setCheckTwo, checkUserName, checkUserPassword, checkUserNumber, auth, setAuth,authCheck, setAuthCheck,
            setCheckUserName, setCheckUserPassword, setCheckUserNumber,doc, setDoc,

            /* this is the states of Admin Confirmation */
            temProviders, setTemProviders, accept, reject, db, setDB, provider, setProvider, isLoading, setIsLoading,

            /* this is the states of Client Appointment */
             check, setCheck, user, setUser, anotherUser, setAnotherUser, allUsers, setAllUsers, 

            /* this is the states of CALENDAR*/
            date, setDate, time, setTime, timesArray, settimesArray, reservation, setReservation, appointments, setAppointments, 
            currentAppointments, setCurrentAppointments


        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext