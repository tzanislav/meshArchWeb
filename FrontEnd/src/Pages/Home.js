import React from "react";
import '../CSS/Home.css';


function Home() {
    return (
        <div>
            <div className="hero-image">
                <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Front.jpg" alt="Hero" />
                <div className="hero-text">
                    <h1>Welcome to the site</h1>
                    <p>Some text</p>
                </div>
                </div>
        </div>
    );
}

export default Home;