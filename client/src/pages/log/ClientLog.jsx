import React from "react";
import { useContext } from "react";
import DataContext from "../../context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";


const ClientLog = () => {
    const {checkTwo, setCheckTwo, setUser,
           userEmail, setUserEmail, userPassword, setUserPassword, userNumber, setUserNumber, setAuth} = useContext(DataContext);
    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state?.previous || "/home"

    const logNumber = async () => {
        const check = {userNumber, userPassword}
        try{
            const response = await axios.post("/user/Nlog", check)
            setAuth(response.data.accessToken)
            setUser(response.data.user)
            if (response){
                console.log(response)
                navigate(from, {
                    state: {
                        previous: from
                    }
                })
            }
        }catch(err){console.log(err)}
    }

    const logEmail = async () => {
        const check = {userEmail: userEmail, userPassword: userPassword}
            try{
                const response = await axios.post("/user/Elog", check)
                setAuth(response.data.accessToken)
                setUser(response.data.user)
                if (response){
                    navigate(from  || "/home", {
                        state: {
                            previous: from
                        }})
                }
        }catch(err){console.log(err)}
    }

        const change  = () => {
            if (checkTwo === true){
                setCheckTwo(false)
            } else (setCheckTwo(true))
           }

    if (checkTwo){
        return(
            <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (userEmail === false){
                    logNumber()
                } else if (userEmail === false){
                    logEmail()
                }
                
            }}>
               
            <input
            placeholder="email"
            type="email"
            required
            onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
            placeholder="password"
            type="password"
            required
            onChange={(e) => setUserPassword(e.target.value)}
            />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => {
                change()
            }}>use number instead</button>
    
            <div>
                <p>dont have an account? 
                <button onClick={() => {
                 navigate("/sign", {
                    state: {
                        previous: from
                    }}
                ) 
            }}>Sign Up</button></p>
            </div>
            </div>
        )
    }else  if (!checkTwo) {
        return(
            <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (userEmail === false){
                    logNumber()
                } else if (userEmail === false){
                    logEmail()
                }}}>
            <input
            placeholder="number"
            type="tel"
            required
            onChange={(e) => setUserNumber(e.target.value)}
            />
            <input
            placeholder="password"
            type="password"
            required
            onChange={(e) => setUserPassword(e.target.value)}
            />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => {
                change()
            }}>use email instead</button>
    
            <div>
                <p>dont have an account?  <button onClick={() => {
                navigate("/sign", {
                    state: {
                        previous: from
                    }})
            }}>Sign Up</button></p>
            </div>
            </div>
        )}
    
}

export default ClientLog