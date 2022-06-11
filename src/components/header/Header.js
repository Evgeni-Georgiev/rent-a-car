import { Link } from 'react-router-dom';
import './header.scss'

export function Header() {
    return (
        <div className='header'>
            <h4>Header</h4>
            <nav style={{display: 'flex', gap: '10px'}}>
                <Link to="customers">Customers</Link>
                <Link to="vehicles">Vehicles</Link>
                <Link to='rental-events'>Rental events</Link>
            </nav>
        </div>
    );
}