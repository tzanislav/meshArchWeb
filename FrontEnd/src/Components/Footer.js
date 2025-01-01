import React from "react";
import '../CSS/Footer.css';
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer>
            <p>© 2024 Mesh Architecture</p>
            <div className="footer-links">
                <Link to="/login">Login</Link>
                <Link to="/sitemap">Site Map</Link>
            </div>
        </footer>
    );
}


export default Footer;