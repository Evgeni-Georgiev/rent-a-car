export function UserCard({ user }) {
    return (
        <div className="user-card">
            <div className="card-header">
                <h2>Todor Ivanov</h2>
            </div>
            <div className="card-body">
                <img src="#" alt="user-image"/>
            </div>
            <div className="card-footer">
                <button className="edit-btn">Edit</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    );
}