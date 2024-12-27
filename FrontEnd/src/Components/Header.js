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

            <nav className="nav-container">
                <div className="nav-item">
                    <Link to="/">Протфолио</Link>
                </div>

                <div className="nav-item">
                    <Link to="/contacts">Контакти</Link>
                </div>

                <div className="nav-item">
                    <Link to="/about">Услуги</Link>
                </div>

                {authToken && (
                    <>
                        <div className="nav-item">
                            <Link to="/projects">Projects</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/users">Users</Link>
                        </div>
                        <div className="nav-item">
                            <button onClick={signOut} className="sign-out-button">Sign Out</button>
                        </div>
                    </>
                ) }
            </nav>
        </header>
    );
}

export default Header;
