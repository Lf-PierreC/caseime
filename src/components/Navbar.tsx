import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item">
                    <Link to="/">Home</Link>
                </li>
                <li className="item">
                    <Link to="/List">Lista de Presentes</Link>
                </li>
            </ul>
            <ul className="list">
                <li className="item-login">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar