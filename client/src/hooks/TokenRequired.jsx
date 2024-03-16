import React from "react";
import { useContext } from "react";
import DataContext from "../context";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";



const TokenRequired = () => {
    const {auth, setAuth, user, setUser} = useContext(DataContext);
    const location = useLocation()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController();


         const getAccess = async () => {
            try{
                await axiosPrivate.get('/users',
                {
                    signal: controller.signal
                });
            }catch(err){
                console.log(err)
/*                 navigate("/log") */
            }
        }

        getAccess(); 

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return(
        auth
        ? <Outlet />
        : <Navigate to={"log"} state={{previous: location}} replace />
    )
}

export default TokenRequired