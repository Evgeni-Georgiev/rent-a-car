import axios from "axios";
import { useEffect, useState } from "react";
import { UserCard } from "../user-card/UserCard";
import { useNavigate } from "react-router-dom";

const styles = {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap"
}

export function UsersList() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [shouldUpdate, setShoultUpdate] = useState(false);
    const  navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/customers').then(u => {
            setUsers([...u.data]);
        }).catch(e => setError(e));
    }, [shouldUpdate]);

    function deleteCustomer(id) {
        axios.delete(`http://localhost:8000/customers/${id}`).then(() => setShoultUpdate(!shouldUpdate)).catch(error => {
            //output error in the console for now
            console.log(error);
        })
    }
    return (
        <>
            <h3>Customers</h3>
            <button onClick={(e) => {
                e.preventDefault();
                navigate('create');
            }}>Add user</button>
            <div style={styles}>
                {users.map((u, index) => {
                    console.log('user',users)
                    return <UserCard key={index} user={u} deleteCallback={deleteCustomer} />
                })}
            </div>
        </>

    );
}