import axios from "axios";
import { useState, useEffect } from "react"

export function RentalEventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/rentalEvents').then((r) => setEvents([...r.data])).catch(er => console.log(er));
    }, []);

    return <>
        {events.map((e, index) => {
            return <div key={index} style={{padding: '10px', width: '100px', border: '1px solid black'}}>
                <p>Start date: {e.startDate}</p>
                <p>End date: {e.endDate}</p>
            </div>
        })}
    </>
}