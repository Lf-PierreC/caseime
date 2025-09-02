import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  loggedIn: boolean;
  onLogout: () => void;
}

function Navbar({ loggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="list">
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        <li className="item">
          <Link to="/lista">Lista</Link>
        </li>

        {loggedIn && (
          <li className="item">
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>

      <ul className="list">
        {loggedIn ? (
          <li className="item-login" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
            Sair
          </li>
        ) : (
          <li className="item-login">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
