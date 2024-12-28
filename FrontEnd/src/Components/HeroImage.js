// HeroImage.js
import React, { useState, useEffect } from 'react';
import '../CSS/HeroImage.css';
import { Link } from 'react-router-dom';

const HeroImage = () => {

  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};


  return (
    <div>
      <div className="hero-image">
        <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Assets/hero_back.webp" alt="back layer" className='back-layer' />
        <img src="https://mesharch.s3.eu-west-1.amazonaws.com/Assets/hero_front.webp" alt="front layer" className='front-layer' />
      </div>
      <div className="hero-text">
        <h1>MESH ARCHITECTURE</h1>
        <p>Визуализацията за вашите проекти</p>
        <button onClick={() => smoothScroll('contact')} >Свържете се с нас!</button>
      </div>
    </div>
  );
};

export default HeroImage;
