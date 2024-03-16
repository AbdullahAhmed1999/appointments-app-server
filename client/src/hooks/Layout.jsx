import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context";
import axios from "../axios";

const Layout = () => { 
    const {setDB, appointments, setAppointments, db} = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await axios.get("/admin/providers")
                setDB(response.data)
            }catch(err){console.log(err)}
        }
        getData();
    }, [])

    useEffect(() => {
        console.log(typeof(db))
    }), [db]
    useEffect(() => {
        const getData = async () => {
            console.log("it is working")
            try{
                const response = await axios.get("/reservation")
                setAppointments(response.data)
            }catch(err){console.log(err)}
        }
        getData();
    }, [])

    return(
        <main className="main">
         <Outlet />
        </main>
    )}

export default Layout