import { Link, Outlet, Navigate } from "react-router-dom";
import Logout from "../images/logout.png";
import Logo from "../images/logo.png";

const dim = 60;

function Nbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-*">
            <Link to="/Home" className="navbar-brand">
                <img src={Logo} className="mx-auto d-block" alt="logo" width={dim} height={dim} />
            </Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/Intern_manager" className="nav-link">Interns</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/Company_organisation" className="nav-link">Utilities</Link>
                    </li>
                    {JSON.parse(localStorage.getItem('auth')) === "admin" &&
                        <li className="navbar-item">
                            <Link to="/Settings" className="nav-link">Settings</Link>
                        </li>
                    }
                </ul>
            </div>
            <Link to="/" className="navbar-brand">
                <img src={Logout} className="mx-auto d-block" alt="logo" width={dim / 2} height={dim / 2} onClick={() => localStorage.removeItem('auth')} />
            </Link>
        </nav>
    );
}

export default function Navbar() {
    let auth = JSON.parse(localStorage.getItem('auth'));
    return (
        auth ?
            <>
                <Nbar />
                <Outlet />
            </> :
            <Navigate to="/" />
    );
}