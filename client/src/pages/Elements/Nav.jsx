import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import DataContext from "../../context"

const Nav = () => {
    const {auth, authCheck} = useContext(DataContext);
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <nav>
            <div >
                {
                    auth ?
                    <Link to={"/home"}>
                    <h1>Logo</h1>
                    </Link> : 
                    <Link to={"/"}>
                    <h1>logo</h1>
                    </Link>
                }

            <ul >
                <li >
                    Find a Doctor
                </li>
                <li  className="nav-button">
                    Find a Hospital
                </li>
                <li  className="nav-button">
                    Emergency Services 
                </li>
            </ul>
            </div>
            <div>

                <button className="provider-button" onClick={() => {
                    navigate("ProvidersLog")
                }}>
                    Sign as a Provider
                </button>

                <button className="/provider-button" onClick={() => {
                    navigate("Admin")
                }}>
                    log to adim
                </button>

                <button onClick={() => {
                    navigate("/log", {
                        state: {
                            previous: location?.state?.previous || "/home"
                        }
                    })
                }}>
                    Log In
                </button>

            </div>
        </nav>
    )} 
           
        
    


export default Nav