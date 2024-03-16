import React from "react";
import { useContext } from "react";
import DataContext from "../../context";
import { Link } from "react-router-dom";

const Main = () => {
    const {}= useContext(DataContext);

    return(
        <>
       <Link to={"sign"}><button>Patient</button></Link>
       <Link to={"ProvidersLog"}><button>Doctor</button></Link>
       </>
    )
}

export default Main