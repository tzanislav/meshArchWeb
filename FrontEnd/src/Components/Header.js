import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../CSS/Header.css';
import { AuthContext } from '../context/AuthContext';

function Header() {
    const { authToken } = React.useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('authToken');
        window.location.reload();
    };

    const smoothScroll = (id) => {
        const navigateAndScroll = () => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(navigateAndScroll, 100); // Delay to ensure the home page loads
        } else {
            navigateAndScroll();
        }
    };

    return (
        <header>
            <nav className="nav-container">
                <div className="nav-item">
                    <Link to="/">Начало</Link>
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
                <div className="nav-item">
                    <Link to="/blog">Blog</Link>
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
                )}
            </nav>
        </header>
    );
}

export default Header;
