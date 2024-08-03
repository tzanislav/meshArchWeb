import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';
import { AuthContext } from '../context/AuthContext';

function Header() {
    const { authToken } = React.useContext(AuthContext);

    const signOut = () => {
        localStorage.removeItem('authToken');
        window.location.reload();
    };

    return (
        <header>
            <Link to="/">
                <h1>Logo</h1>
            </Link>
            <nav className="nav-container">
                <div className="nav-item">
                    <Link to="/">Portfolio</Link>
                </div>
                <div className="nav-item">
                    <Link to="/about">About</Link>
                </div>
                <div className="nav-item">
                    <Link to="/projects">Projects</Link>
                </div>
                {authToken ? (
                    <>
                        <div className="nav-item">
                            <Link to="/users">Users</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/projects">Projects</Link>
                        </div>
                        <div className="nav-item">
                            <button onClick={signOut} className="sign-out-button">Sign Out</button>
                        </div>
                    </>
                ) : (
                    <div className="nav-item">
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
