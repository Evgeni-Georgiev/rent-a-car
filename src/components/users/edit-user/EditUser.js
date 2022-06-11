import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function EditUser() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [nameValidate, setNameVlidate] = useState(null);
    const [imgSrcValidate, setImgSrcValidate] = useState(null);
    const [shouldChange, setShouldChange] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/customers/${params.id}`).then(r => setUser(r.data)).catch(error => setError(error));
    }, [params.id, shouldChange]);

    function editCustomer(e) {
        e.preventDefault();
        setNameVlidate(null);
        setImgSrcValidate(null);
        setError(null);

        if(user.name.trim() !== '' && user.imgSrc.trim() !== '') {
            axios.put(`http://localhost:8000/customers/${user.id}`, user).then(r => setShouldChange(!shouldChange)).catch(error => setError(error));
        }

        if(user.name.trim() === '') {
            setNameVlidate('Field name should not be empty');
        }

        if(user.imgSrc.trim() === '') {
            setImgSrcValidate('Field image should not be empty');
        }
    }

    return (
    <>
        <p>create customer</p>
        <button onClick={(e) => {
            e.preventDefault();
            navigate('../');
        }}>Back to customer list</button>
        {user && (<form onSubmit={editCustomer}>
            <div>
                <label>Name:</label>
                <input name="name" defaultValue={user.name} onChange={(e) => setUser((prevValue) => ({...prevValue, name: e.target.value }))} />
                {nameValidate && <p style={{color: 'red'}}>{nameValidate}</p>}
            </div>
            <div>
                <label>Image:</label>
                <input name="imgSrc" defaultValue={user.imgSrc} onChange={(e) => setUser((prevValue) => ({...prevValue, imgSrc: e.target.value }))}/>
                {imgSrcValidate && <p style={{color: 'red'}}>{imgSrcValidate}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>)}
        {error && <p style={{color: 'red'}}>{error}</p>}
    </>
    );
}