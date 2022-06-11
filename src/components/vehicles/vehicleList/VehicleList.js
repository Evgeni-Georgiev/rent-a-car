import axios from "axios";
import { useState, useEffect } from "react";
import { VehicleCard } from "../vehicleCard/VehicleCard";
import { useNavigate } from "react-router-dom";

export function VehicleList() {
    const [vehicles, setVehicles] = useState(null);
    const [error, setError] = useState(null);
    const [shouldUpdate, setShoultUpdate] = useState(false);
    const navigate = useNavigate();

    function deleteVehicle(id) {
        axios.delete(`http://localhost:8000/vehicles/${id}`).then(() => setShoultUpdate(!shouldUpdate)).catch(er => {
            //Print the error in the console as well
            console.log(er);
            setError(er);
        });
    }

    useEffect(() => {
        axios.get('http://localhost:8000/vehicles').then(r => setVehicles([...r.data])).catch(er => setError(er));
    }, [shouldUpdate]);   
    return <>
        <h2>Vehicle list</h2>
        <button onClick={(e) => {
            e.preventDefault();
            navigate('create');

        }}>Create vehicle</button>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            {
                vehicles && vehicles.map(v => {
                    return <VehicleCard key={v.id} vehicle={v} deleteCallback={deleteVehicle} />
                })
            }
        </div>
    </>;
}