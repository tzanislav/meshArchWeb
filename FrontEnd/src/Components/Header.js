import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';

function Header() {
    return (
        <header>
            <Link to="/">
                <h1>Logo</h1>
            </Link>
            <nav>

                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/previous-projects">Previous Projects</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/create-project">Create Project</Link>
                </li>
                <li>
                    <Link to="/edit-project">Edit Project</Link>
                </li>

            </nav>
        </header>
    );
}

export default Header;