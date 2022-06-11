import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateVehicle() {
    const [fuelTypes, setFuelTypes] = useState(null);
    const [vehicleTypes, setVehicleTypes] = useState(null);

    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [picture, setPicture] = useState();
    const [constructionYear, setConstructionYear] = useState();
    const [numberOfSeats, setNumberOfSeats] = useState();
    const [pricePerDay, setPricePerDay] = useState();
    const [count, setCount] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([axios.get('http://localhost:8000/vehicleTypes'), axios.get('http://localhost:8000/fuelTypes')]).then(r => {
            setVehicleTypes([...r[0].data])
            setFuelTypes([...r[1].data])
        }).catch(er => console.log(er))
    }, []);

    function createVehicle(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/vehicles', {brand, model, picture, constructionYear, numberOfSeats, pricePerDay, count, fuelType: e.target.elements.fuelType.value, vehicleType: e.target.elements.vehicleType.value}).then(() => navigate('../')).catch(er => console.log(er))
    }

    return <>
        <form onSubmit={createVehicle} >
            <div>
                <label>Brand</label>
                <input type='text' name='brand' required onChange={(e) => setBrand(e.target.value.trim())} />
            </div>
            <div>
                <label>Model</label>
                <input type='text' name='model' required onChange={(e) => setModel(e.target.value.trim())}/>
            </div>
            <div>
                <label>Picture:</label>
                <input type='text' name='picture' required onChange={(e) => setPicture(e.target.value.trim())}/>
            </div>
            <div>
                <label>Construction year:</label>
                <input type='text' name='year' required onChange={(e) => setConstructionYear(e.target.value.trim())}/>
            </div>
            <div>
                <label>Number of seats:</label>
                <input type='number' name='seats' min='2' defaultValue={2} required onChange={(e) => setNumberOfSeats(e.target.value)} />
            </div>
            <div>
                <label>Price per day</label>
                <input type='text' name='price' required onChange={(e) => setPricePerDay(e.target.value.trim())}/>
            </div>
            <div>
                <label>Count:</label>
                <input type='number' name='number' min='1' defaultValue='1' required onChange={(e) => setCount(e.target.value)} />
            </div>
            {
                fuelTypes?.length > 0 &&  <div>
                <label>Fuel types:</label>
                <select name='fuelType' required  defaultValue={fuelTypes[0].id}> 
                    {
                        fuelTypes?.map((t, index) => {
                            return <option key={index} value={t.id}>{t.type}</option>
                        })
                    }
                </select>
            </div>
            }
           {
               vehicleTypes?.length > 0 &&  <div>
               <label>Vehicle types:</label>
               <select name='vehicleType' required defaultValue={vehicleTypes[0]?.id}>
                   {
                       vehicleTypes?.map((t, index) => {
                           return <option key={index} value={t.id}>{t.type}</option>
                       })
                   }
               </select>
           </div>
           }
            <button type="submit">Submit</button>
        </form>
    </>
}