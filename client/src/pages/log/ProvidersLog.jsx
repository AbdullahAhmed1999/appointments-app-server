import React from "react"
import DataContext from "../../context"
import { useContext } from "react"

const ProvidersLog = () => {
    const { name, setName, email, setEmail, password, setPassword, num, setNum, clinicNum, setClinicNum, img, setImg, city, setCCity,
        location, setLocation, sex, setSex, specialty, setSpecialty, birth, setBirth, grad, setGrad, gradYear,
         setGradYear, exp, setExp,board, setBoard, ProviderLog, hours, setHours} = useContext(DataContext);

        const createOpening = (day, time) => {
            const check = {...hours}
            console.log(check)
            check[day].open = time
            console.log(hours)
            setHours(check)
        }
        const createClosing = (day, time) => {
            const check = {...hours}
            check[day].close = time
            console.log(hours)
            setHours(check)
        }
        

    return(
        <form className="flex flex-col p-9 space-y-8" onSubmit={(e) => {
            e.preventDefault();
            ProviderLog()
        }}>
            <div>
            <label htmlFor="name" className="">Name</label>
            <input
            className="border-2 rounded-lg border-gray-700 ml-4"
            type="text"
            id="name"
            required
            autoComplete="yes"
            value={name}
            onChange={(e) => {
                setName(e.target.value)
            }}
            />
            </div>
            {/* <div>
            <label htmlFor="city">City</label>
            <select
            id="city"
            required
            value={city}
            onChange={(e) => {
                setCCity(e.target.value)
            }}
            >
                <option>Mosul</option>
                <option>Basra</option>
                <option>Baghdad</option>
                <option>Erbil</option>
            </select>
            </div>
            <div>
            <label htmlFor="location">Location</label>
            <select
            id="location"
            required
            value={location}
            onChange={(e) => {
                setLocation(e.target.value)
            }}
            >
                <option>location 1</option>
                <option>location 2</option>
                <option>location 3</option>
                <option>location 4</option>
                <option>location 5</option>
                <option>location 8</option>
                <option>location 9</option>
                <option>location 10</option>
                <option>location 11</option>
                <option>location 12</option>
                <option>location 13</option>
                <option>location 14</option>
                <option>location 15</option>
                <option>location 16</option>
                <option>location 17</option>
                <option>location 18</option>
                <option>location 19</option>
                <option>location 20</option>
 
            </select>
            </div>
            <div>
            <label htmlFor="name">Image</label>
            <input
            type="file"
            id="image"
            required
            onChange={(e) => {
                setImg(e.target.files[0])
            }}
            />
            </div> */}
            <div>
            <label htmlFor="number">Number</label>
            <input
            className="border-2 rounded-lg border-gray-700 ml-4"
            type="tel"
            id="number"
            required
            value={num}
            onChange={(e) => {
                setNum(e.target.value)
            }}
            />
            </div>
           {/*  <div>
            <label htmlFor="clinic-number">Clinc Number</label>
            <input
            className="border-2 rounded-lg border-gray-700 ml-4"
            type="tel"
            id="clinic-number"
            required
            value={clinicNum}
            onChange={(e) => {
                setClinicNum(e.target.value)
            }}
            />
            </div> */}
            <div>
            <label htmlFor="email">Email</label>
            <input
            className="border-2 rounded-lg border-gray-700 ml-4"
            type="email"
            id="email"
            required
            autoComplete="yes"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input
            className="border-2 rounded-lg border-gray-700 ml-4"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            />
            </div>
            <div>
{/*             <label htmlFor="date">Date of Birth</label>
            <input
            type="date"
            id="date"
            required
            value={birth}
            onChange={(e) => {
                setBirth(e.target.value)
            }}
            />
            </div>
            <div>
            <label htmlFor="sex">Sex</label>
            <select
            id="sex"
            required
            value={sex}
            onChange={(e) => {
                setSex(e.target.value)
            }}
            >
                <option>male</option>
                <option>female</option>
            </select>
            </div>
            <div>
            <label htmlFor="Speciality">Speciality</label>
            <select
            id="Speciality"
            required
            value={specialty}
            onChange={(e) => {
                setSpecialty(e.target.value)
            }}
            >
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
                <option>option 5</option>
                <option>option 6</option>
                <option>option 7</option>
                <option>option 8</option>
                <option>option 9</option>
                <option>option 10</option>
                <option>option 11</option>
                <option>option 12</option>
                <option>option 13</option>
                <option>option 14</option>
                <option>option 15</option>
                <option>option 16</option>
                <option>option 17</option>
                <option>option 18</option>
                <option>option 19</option>
                <option>option 20</option>
            </select>
            </div>
            <div>
            <label htmlFor="school" >Graduated Frpm</label>
            <input 
            className="border-2 rounded-lg border-gray-700 ml-4"
            id="school"
            type="text"
            required
            value={grad}
            onChange={(e) => {
                setGrad(e.target.value)
            }}
            />
            </div>
            <div>
            <label htmlFor="graduation-year" >Graduation year</label>
            <input 
            className="border-2 rounded-lg border-gray-700 ml-4"
            id="graduation-year"
            type="text"
            required
            value={gradYear}
            onChange={(e) => {
                setGradYear(e.target.value)
            }}
            />
            </div>
            <div>
            <label htmlFor="experience" >Years of Experinece</label>
            <input 
            className="border-2 rounded-lg border-gray-700 ml-4"
            id="experience"
            type="text"
            required
            value={exp}
            onChange={(e) => {
                setExp(e.target.value)
            }}
            />
            </div>
            <div>
            <label htmlFor="board" >Board Certificate</label>
            <input 
            className="border-2 rounded-lg border-gray-700 ml-4"
            id="board"
            type="text"
            required
            value={board}
            onChange={(e) => {
                setBoard(e.target.value)
            }}
            /> */}
            <div className="SCHEDULES">
                {Object.entries(hours).map(([day, time], i) => (
                    <div key={i}>
                    <label>{day}</label>
                    <input
                    type="time"
                    value={time.open}
                    onChange={(e) => createOpening(day, e.target.value)}
                    required
                    />
                    <input
                    type="time"
                    value={time.close}
                    onChange={(e) => createClosing(day, e.target.value)}
                    required
                    />


                    </div>
                ))}
            </div>
            </div>
            <button type="submit">
                submit
            </button>
        </form>
    )
}

export default ProvidersLog