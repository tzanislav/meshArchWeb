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

    const smoothScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>

            <nav className="nav-container">
                <div className="nav-item">
                    <a onClick={() => smoothScroll('home')}>Начало</a>
                </div>
                <div className="nav-item">
                    <a onClick={() => smoothScroll('services')}>Услуги</a>
                </div>
                <div className="nav-item">
                    <a onClick={() => smoothScroll('projects')}>Проекти</a>
                </div>
                <div className="nav-item">
                    <a onClick={() => smoothScroll('contact')}>Свържете се с нас</a>
                </div>

                {authToken && (
                    <>
                        <div className="nav-item">
                            <Link to="/blog">Blog</Link>
                        </div>
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
                )}
            </nav>
        </header>
    );
}

export default Header;
