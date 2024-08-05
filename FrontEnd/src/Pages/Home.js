import '../CSS/Home.css';
import React from 'react';
import ProjectColumns from '../Components/ProjectColumns';



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
            <div className="home-featured-projects">
                <ProjectColumns />
                
            </div>
        </div>
    );
}

export default Home;