import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function CreateUser() {
    const [name, setName] = useState();
    const [nameValidation, setNameValidation] = useState(null); 
    const [imgSrc, setImgSrc] = useState();
    const [imgSrcValidation, setImgSrcValidation] = useState(null); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function submitCustomerForm(e) {
        e.preventDefault();
        setNameValidation(null);
        setImgSrcValidation(null);
        setError(null);

        if(name && name.trim() !== '' && imgSrc && imgSrc.trim() !== '') {
            axios.post('http://localhost:8000/customers', {name, imgSrc}).then(() => {
                navigate('../');
            }).catch(er => setError(er));
        }

        if(!name || name.trim() === '') {
            setNameValidation('Name field is required');
        }

        if(!imgSrc || imgSrc.trim() === '') {
            setImgSrcValidation('Image field is required');
        }
        console.log({
            name, imgSrc
        });
    }

    return (<>
        <p>create customer</p>
        <button onClick={(e) => {
            e.preventDefault();
            navigate('../');
        }}>Back to customer list</button>
        <form onSubmit={submitCustomerForm}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                {nameValidation && <p style={{color: 'red'}}>{nameValidation}</p>}
            </div>
            <div>
                <label>Image:</label>
                <input type="text" name="imgSrc" onChange={(e) => setImgSrc(e.target.value)} />
                {imgSrcValidation && <p style={{color: 'red'}}>{imgSrcValidation}</p>}
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    </>);
}