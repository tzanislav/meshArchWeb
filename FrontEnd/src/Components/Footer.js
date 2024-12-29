import React from "react";
import '../CSS/Footer.css';
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer>
            <p>© 2024 Mesh Architecture</p>
            <div className="footer-links">
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/login">Login</Link>
            </div>
        </footer>
    );
}


export default Footer;