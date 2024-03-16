import React from "react"
import Home from "./pages/Elements/Home"
import Nav from "./pages/Elements/Nav"
import ProvidersLog from "./pages/log/ProvidersLog"
import Admin from "./pages/log/Admin"
import Confirmation from "./pages/loggedElements/confirmation"
/* import Main from "./pages/Elements/Main" */
import AllProviders from "./pages/Elements/AllProviders"
import Booking from "./pages/loggedElements/Booking"
import ClientLog from "./pages/log/ClientLog"
import ClientSign from "./pages/log/ClientSign"
import ClientNames from "./pages/loggedElements/ClientNames"
import Doc from "./pages/Elements/Doc"
import { Routes , Route } from "react-router-dom"
import { DataProvider } from "./context"
import Layout from "./hooks/Layout"
import TokenRequired from "./hooks/TokenRequired"
import PersistantLog from "./hooks/PersistantLog"
import HomeLog from "./pages/loggedElements/HomeLogged"
import CurrentAppointments from "./pages/loggedElements/CurrentAppointmenta"
import "./App.css"


function App() {


  return (
    <DataProvider>
      <Nav />
      <Routes>
{/*         <Route path="/" element = {<Layout />}> */}
          {/* these are publuc Routes */}
          <Route path="/sign" element = {<ClientSign />} />
          <Route path="/log" element = {<ClientLog />} />
          <Route path="/providersLog" element = {<ProvidersLog />} />

          {/* these are Protected Routes */}
          <Route path="/" element = {<Layout />}>
          <Route element = {<PersistantLog /> } >  
            <Route path="/" element = {<Home />} />
            <Route path="/providers" element = {<AllProviders />} />
            <Route path="/Doc/:id" element = {<Doc />} />
 
          <Route element = {<TokenRequired />} >
            <Route path="/home" element = {<HomeLog />} />
            <Route path="/ClientsName/:id" element = {<ClientNames />} />
            <Route path="/Booking/:id" element = {<Booking />} />
            <Route path="/confirmation/:id" element = {<Confirmation />} />
            <Route path="/appointments/current" element = {<CurrentAppointments />} />
          </Route>
          </Route>
          </Route>

          <Route path="Admin" element = {<Admin />} />
{/*         </Route> */}
      </Routes>
    </DataProvider>

  )
}

export default App
