import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";


const ClientSign = () => {
    const {setAuth,setUser, setCheckUserName, setUserEmail, setCheckUserPassword, setCheckUserNumber, userEmail, auth,
        checkUserName, checkUserPassword, setUserPassword, checkUserNumber, setUserName, setUserNumber, 
    userName, userNumber, userPassword}  = useContext(DataContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.previous || "/home"
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const sign = async () => {
        const check = {
            userName, userEmail, userNumber, userPassword
        }
        try{
            const response = await axios.post("/user", check)
            setAuth(response.data.accessToken)
            setUser(response.data.user)
            console.log(response.data.accessToken)
            if (response){
                navigate(from, {
                    state:{
                        previous: from
                    }
                })
            }
        }catch(err){console.log(err)}
    }

    useEffect(() => {
        const checkNmae = () => {
            const check = USER_REGEX.test(checkUserName)
            if (check){
                setUserName(checkUserName)
            }}
            checkNmae();
    }, [checkUserName])   


    useEffect(() => {
        const checkPassword = () => {
            const check = PWD_REGEX.test(checkUserPassword)
            if (check){
                setUserPassword(checkUserPassword)
            }}
        checkPassword();
    }, [checkUserPassword]) 


    useEffect(() => {
        const checkNumber = () => {
            if (checkUserNumber.length === 10){
                setUserNumber(checkUserNumber)
            }}
        checkNumber();
    }, [checkUserNumber])   

    return(
        <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            sign()
        }}>
            <input
            placeholder="name"
            autoComplete="off"
            type="text"
            required
            onChange={(e) => setCheckUserName(e.target.value)}
            />
            <input
            placeholder="number"
            autoComplete="off"
            type="tel"
            required
            onChange={(e) => setCheckUserNumber(e.target.value)}
            />
            <input
            placeholder="email"
            autoComplete="off"
            type="email"
            required
            onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
            placeholder="password"
            autoComplete="off"
            type="password"
            required
            onChange={(e) => setCheckUserPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <div>
            <p>already have an account? <button onClick={() => {
                navigate("/log" , {
                    state: {
                        previous: from
                    }})
            }}>Log In</button> </p>
        </div>
        </div>
    )
}

export default ClientSign