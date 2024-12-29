import '../CSS/Home.css';
import '../CSS/Service.css';
import React from 'react';
import ProjectColumns from '../Components/ProjectColumns';
import HeroImage from '../Components/HeroImage';
import ContactForm from '../Components/ContactForm';



function Home() {


    return (
        <div id='home'>
            
            <HeroImage />


            <div className="home-services" id='services'>
                <h2> Услуги </h2>
                <hr />
                <div className="service-cards">
                    <div className="service-container">
                        <h1>Архитектурна Визуализацията</h1>
                        <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Assets/serv-Arch.webp" alt="back layer" className='back-layer' />
                    </div>
                    <div className="service-container">
                        <h1>Интериорна Визуализацията</h1>
                        <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Assets/serv-Interior.webp" alt="back layer" className='back-layer' />
                    </div>
                    <div className="service-container">
                        <h1>Продуктова Визуализацията</h1>
                        <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Assets/ser-product.webp" alt="back layer" className='back-layer' />
                    </div>
                </div>
            </div>


            <div className="home-featured-projects" id='projects'>
                <h2> Проекти </h2>
                <hr />
                <ProjectColumns />
            </div>
            <div className="contact-us" id="contact">
                <h2> Свържете се с нас </h2>
                <hr />
                <ContactForm />
            </div>
        </div>
    );
}

export default Home;