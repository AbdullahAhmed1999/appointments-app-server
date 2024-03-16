import React from "react";
import { useContext, useEffect } from "react";
import DataContext from "../../context";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ClientNames = () => {
    const { check, setCheck, anotherUser, setAnotherUser, allUsers, setAllUsers, user} =useContext(DataContext);
    const Navigate = useNavigate();
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        console.log(`user: ${user}`)
    }, [user])


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController();

         const getUser = async () => {
            try{
                const response = await axiosPrivate.get("/Booking/userName", {
                    signal: controller.signal
                })
                const check = response.data

                const filter = check.filter((patient) => {
                    return patient.userId === user._id
                })

                if (isMounted){
                    setAllUsers(filter)
            }
            }catch(err){
                console.log("the error is here")
                console.log(err)
            }
        }

        getUser(); 

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [user]) 

    useEffect(() => {
        console.log(allUsers)
    }, [allUsers])
    const addNewUser = async () => {
        try{
            await axiosPrivate.post("/Booking/userName", {
                userId: user._id,
                patient: anotherUser
            })
        }catch(err){console.log(err)}
    }

    const AddOptions = () => {
        if (check === false){
            setCheck(true)
        } else if (check === true){
            setCheck(false)
        }
    }

    if (check === false){
        return(
            <main>
                 <h1>Who is the appointment for</h1>
                 <div>
                    <button onClick={() => {
                        localStorage.removeItem("patient")
                        Navigate(`/Booking/${id}`, {
                            state:{
                                previous: `/Booking/${id}`
                            }
                        })
                    }}>For your self</button>
                    <button onClick={() => {
                        AddOptions()
                    }}>For someone Else</button>
                </div>
            </main>)
    }
    if (check === true){
        return(
            <main>
                 <h1>Who is the appointment for</h1>
                 <div>
                 <button onClick={() => {
                        localStorage.removeItem("patient")
                        Navigate(`/Booking/${id}`, {
                            state:{
                                previous: `/Booking/${id}`
                            }
                        })
                    }}>For your self</button>
                    <button onClick={() => {
                        AddOptions()
                    }}>Remove the extra fields</button>
                </div>          
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addNewUser();
                    Navigate(`/Booking/${id}`, {
                        state: {
                            previous: `/Booking/${id}`
                        }
                    })
                }}>
                   <label>Add thier name</label>
                   <input 
                   required
                   placeholder="Add another user"
                   value={anotherUser}
                   onChange={(e) => {
                    setAnotherUser(e.target.value)
                    localStorage.removeItem("patient")
                    const check = localStorage.setItem("patient", JSON.stringify(e.target.value))
                    console.log(check)
                }}      
                   />
                   <button type="submit">Submit</button>
                </form>
                {allUsers &&
                <div>
                    {allUsers?.map((user, i) => (
                        <button key={i} onClick={() => {
                            setAnotherUser(user.patient)
                            localStorage.removeItem("patient")
                            const check = localStorage.setItem("patient",JSON.stringify(user.patient) )
                            console.log(check)
                            Navigate(`/Booking/${id}`, {
                                state:{
                                    previous: `/Booking/${id}`
                                }
                            })
                        }}>{user.patient}</button>
                    ))}
                </div>}
            </main>
        )}}

export default ClientNames