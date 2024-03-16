import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context";
import RefreahToken from "./refreshToken";
import axios from "../axios";

const PersistantLog = () => {
    const {auth, isLoading , setIsLoading, setDB} = useContext(DataContext)
    const Refresh = RefreahToken()
  

    useEffect(() => {
        let isMount = true
        const refreshing = async () => {
            try{
                await Refresh()
            }catch(err){
                console.log(err)}
            finally{
                isMount && setIsLoading(false)
            }
        }

        !auth ? refreshing() : setIsLoading(false)
        return () => isMount = false
    }, [])


    return(
        isLoading ? 
        <p>loading.....</p> :
        <Outlet />
    )
}

export default PersistantLog