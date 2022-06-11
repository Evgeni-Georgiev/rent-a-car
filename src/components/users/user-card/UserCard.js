import { useNavigate } from "react-router-dom";

const cardStyles = {
    width: '100px',
    border: '1px solid black',
    padding: '10px'
} 

const imgStyles = {
    width: '100%',
    height: '30px'
}


export function UserCard({user, deleteCallback}) {
    const navigate = useNavigate();
    return (
        <div className="user-card" style={cardStyles}>
            <div className="card-header">
                <p>{user.name}</p>
            </div>
            <div className="card-body">
                <img src={user.imgSrc} alt="user-image" style={imgStyles}/>
            </div>
            <div className="card-footer">
                <button className="edit-btn" onClick={(e) => {
                    e.preventDefault();
                    navigate(`edit/${user.id}`);
                }}>Edit</button>
                <button className="delete-button" onClick={(e) => {
                    e.preventDefault();
                    deleteCallback(user.id);
                }}>Delete</button>
            </div>
        </div>
    );
}