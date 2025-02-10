import '../CSS/Home.css';
import '../CSS/Service.css';
import React from 'react';
import ProjectColumns from '../Components/ProjectColumns';
import HeroImage from '../Components/HeroImage';
import ContactForm from '../Components/ContactForm';



function Home() {


    return (
        <div id='home' className="home-container">
            
            <HeroImage />


            <div className="home-services" id='services'>
                <h2> Услуги </h2>
                <hr />
                <p>
                Mesh Architecture е студио с над 15 години опит в създаването на висококачествени 
                3D визуализации за архитектурни проекти, интериорен дизайн и продуктова визуализация. 
                 Работим с архитекти, дизайнери, строителни компании и производители, за да превърнем техните идеи във впечатлявати изображения. 
                 Независимо дали става въпрос за мащабни архитектурни проекти, уютни интериори или 
                 прецизна продуктови визуализации, нашият екип съчетава техническа прецизност и художествен усет, за да създаде фотореалистични визуализации.
                 Вярваме в силата на добрия дизайн и въздействието на качествената визуализация. 
                 Затова подхождаме с внимание към всеки детайл – от осветлението и текстурите до композицията и атмосферата на изображението. 
                 Нашата цел е да ви помогнем да представите проектите си по най-добрия начин – така че да впечатляват, вдъхновяват и продават.
                 Ако търсите професионален партньор за архитектурна, интериорна или продуктова визуализация, свържете се с нас и нека създадем нещо впечатляващо заедно.
                
                </p>
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