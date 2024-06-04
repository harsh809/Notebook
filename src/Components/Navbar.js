import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import usercontext from '../context/notes/usercontext';
import './CSS/Navbar.css';

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const context = useContext(usercontext);
    const { user } = context;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        props.showalert("Logout Successfully", "success");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <div className="auth-buttons">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{gap:"5px"}}>
                                    <li className="nav-item">
                                        <Link className="btn nav-btn" to="/login" role="button">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn nav-btn" to="/signup" role="button">Sign Up</Link>
                                    </li>
                                </ul>
                            </div> :
                            <div className="avatar-container">
                                <button className="btn nav-btn" onClick={handleLogout} style={{marginRight:"5px"}}>Logout</button>
                                <Avatar className='avatar'>{user ? user.name.charAt(0) : ''}</Avatar>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
