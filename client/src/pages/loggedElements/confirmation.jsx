import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../../context";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const Confirmation = () => {
    const {reservation, db, user, setDoc, doc,  anotherUser} = useContext(DataContext)
    const {id} = useParams()
    useEffect(() => {
        const doctor = db.map((doc) => {
            return doc._id == id
        })
        console.log(doctor)
        setDoc(doctor)
    }, [db])

    return(
        <div>
            <p>your reservation with doctor {doc.name} is at {
                format(reservation, 'PPPP p')} under the name of {
                    anotherUser ? anotherUser : user.name
                }</p>
                <button>
                    confirm reservation
                </button>
        </div>
    )
}

export default Confirmation