import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../../context";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";

const Doc = () => {
    const {db, provider, setProvider, auth, authCheck} = useContext(DataContext);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const provider = db.find((provider) => provider._id == id)
        setProvider(provider)
    }, [])



    if (provider !== null && provider !== undefined){
        return(
            <main>
            <div>
                <h1>{provider.name}</h1>
                <p>{provider.num}</p>
                <p>{provider.clinicNum}</p>
            </div>

               {
                    auth ? 
                    <div>
                     <button onClick={() => {
                        navigate(`/ClientsName/${provider._id}`)
                     }}>
                        Book an appointment
                     </button>
                    </div> :
                      <button onClick={() =>{
                        navigate("/log", {
                            state: {
                                previous: `/ClientsName/${provider._id}`
                            }
                        })
                      }}>Navigate</button>
                }     

            </main>
        )
            
    }else {
        return(
            <p>loading....</p>
        )
    }



}

export default Doc