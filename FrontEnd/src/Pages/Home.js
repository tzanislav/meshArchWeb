import '../CSS/Home.css';
import React from 'react';
import ProjectColumns from '../Components/ProjectColumns';
import HeroImage from '../Components/HeroImage';


function Home() {


    return (
        <div>
            <HeroImage />

            <div className="home-featured-projects">
                <ProjectColumns />          
            </div>
        </div>
    );
}

export default Home;