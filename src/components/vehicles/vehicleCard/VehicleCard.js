import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function VehicleCard({ vehicle, deleteCallback }) {
    const [rentalEvents, setRentalEvents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/rentalEvents?vehicle=${vehicle.id}`).then(r => setRentalEvents(r.data.length)).catch(er => console.log(er));
    }, []);
    return (
        <>
            <div style={{widht: '100px', padding: '10px', border: '1px solid black'}}>
                <section>
                    <img style={{width: '100%', height: '50px'}} src={vehicle.picture} alt='Vehicle image' />
                    <h3>{ vehicle.brand }</h3>
                    <p>{ vehicle.model }</p>
                </section>
                <section>
                    <p>Seats: {vehicle.numberOfSeats}</p>
                    <p>Price: { vehicle.pricePerDay }</p>
                    <p>Cars  count: { vehicle.count }</p>
                </section>
                <section style={{display: 'flex', gap: '5px'}}>
                    <button disabled={rentalEvents > 0} onClick={(e) => {
                        e.preventDefault();
                        deleteCallback(vehicle.id);
                    }}>Delete</button>
                    <button disabled={vehicle.count - rentalEvents === 0}>Rent</button>
                </section>
            </div>
        </>
    );
}