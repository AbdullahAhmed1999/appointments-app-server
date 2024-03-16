import React from "react";
import { useContext } from "react";
import DataContext from "../../context";

const Admin = () => {
    const {temProviders, accept, reject} = useContext(DataContext);
    console.log(temProviders)

     if (temProviders){
        return(<ul>
                {temProviders?.map((provider, i) => (
                    <li key={i}>
                    <p>{provider.name}</p>
                    <p>{provider.num}</p>
                    <p>{provider.clinicNum}</p>
                    <button onClick={() => {accept(provider)
                    reject(provider);
                    }}>accept</button>
                    <button onClick={() => reject(provider)}>refuse</button>
                    </li>
                ))} 
            </ul>
        )
    }
    return(
        <p>loading...</p>
    )

}

export default Admin