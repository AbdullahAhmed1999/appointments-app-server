import React from "react";
import axios from "../axios";
import { useContext } from "react";
import DataContext from "../context";

const  RefreahToken = () => {
    const { setAuth, setUser} = useContext(DataContext)

    const useRefresh = async () => {
        try{
            const response = await axios.get("refresh")
            if (response){
                setAuth(response.data.accessToken)
                setUser(response.data.user)
                console.log(response)
            }
            return response.data.accessToken
        }catch(err){console.log(err)}
    }
    return useRefresh
}

export default RefreahToken