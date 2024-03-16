import React from "react";
import { useContext } from "react";
import DataContext from "../../context";

const AllProviders = () => {
    const {db} = useContext(DataContext);
    if (db){
        return(
            <div>
                <ul>
                {db?.map((provider, i) => (
                    <li key={i}>
                      <p>{provider.name}</p>
                        <p>{provider.num}</p>
                        <p>{provider.clinicNum}</p>
                    </li>
    
                ))}
                </ul>
            </div>
        )
    }
    
}

export default AllProviders