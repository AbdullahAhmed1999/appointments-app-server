import { useContext } from "react"
import DataContext from "../context"
import RefreahToken from "./refreshToken"
import axios from "axios"


const useAxiosPrivate = () => {
    const {auth} = useContext(DataContext)
    const refresh = RefreahToken();

    const axiosPrivate = axios.create({
        baseURL: "http://localhost:3000",
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    
    axiosPrivate.interceptors.request.use(
        (req) => {
            if (!req.headers["Authorization"]){
                req.headers["Authorization"] = `Bearer ${auth}`
                const check = req.headers.Authorization 
            }
            
            return req
            
        }, (error) => {
            Promise.reject(`first error ${error}`)
        }
    )
    
    axiosPrivate.interceptors.response.use(
        (res) => {
            return(res)    
        }, async (error) => {
            const prevRequest = error?.req;
            let check = false
            if (error?.response?.status === 403 && !check) {
                check = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    )
    

    return(axiosPrivate)
}

export default useAxiosPrivate





 