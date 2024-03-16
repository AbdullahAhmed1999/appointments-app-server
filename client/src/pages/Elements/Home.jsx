import React from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import DataContext from "../../context"
import { useEffect } from "react"
import axios from "../../axios"
import { useNavigate } from "react-router-dom"


const Home  = () => {
    const {db} = useContext(DataContext);
    const navigate = useNavigate();

   
    return(
        <>
        <section id="hero">
        <h1>An Easier Way To Find 
        Your Healthcare Provider</h1>
        <p> You can search for a provider by name, service and use the advanced
filtering feature for more specific search</p>
        <form>
            <input 
            placeholder="Search for provider, or a Specialty "
            required
            />
            <input 
            placeholder="Mosul, NI "
            required
            />
            <button type="submit">
                Search
            </button>
        </form>
        </section>
        <section id="top-providers">
            <div>
            <h2>Our Most Popular Doctors</h2>
            <p>You can see our most visited Providers in the past month</p>
            </div>
            <ul>
                {
                    db?.slice(0,4).map((provider, i) => (
                        <li key={i}>
{/*                     <img src={`../../../server/public/image/${provider.image.imageName}`}/> */}
                    <div>
                        <h5>{provider.name}</h5>
{/*                         <h5>{provider.specialty}</h5> */}
                    </div>
                    <div>
                        <button>
                            Schedule Online
                        </button>
                        <button onClick={
                            () => {
                                navigate(`/Doc/${provider._id}`, {
                                    state: {
                                        previous: `/Doc/${provider._id}`
                                    }       
                                })
                            }
                        }>
                            View Profile
                        </button>
                    </div>
                </li>
                    ))
                }
                <button onClick={
                            () => {
                                navigate(`/providers`, {
                                    state: {
                                        previous: "/providers"
                                    } 
                                })
                            }
                        }>See All Providers</button>
            </ul>
        </section>
        <section id="top-specialties">
            <div>
                <div>
                <h2>Popular Searches by Specialty</h2>
                <p>You can search for providers of a specific specialty and choose 
                    what suites you</p>
                </div>
                <div>
                    <img src="djdj.png"/>
                    <h5>Family medicine</h5>
                </div>
                <h2>See All Specialties</h2>
            </div>
        </section>
        </>
    )
}

export default Home