import React, { useState, useEffect } from 'react';
import '../CSS/ImageCarousel.css';
import ImageLightbox from './ImageLightbox';
import { useSwipeable } from 'react-swipeable';

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });


  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    // Update the body overflow style based on the lightbox state
    document.body.style.overflow = lightbox ? 'hidden' : 'auto';
  }, [lightbox]); // Depend on lightbox state

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 37) { // Left arrow
        goToPrevious();
      } else if (e.keyCode === 39) { // Right arrow
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length]); // Dependencies ensure functions are up to date

  const handleClick = () => {
    console.log("clicked");
    setLightbox(prev => {
      // Toggle lightbox state
      const newLightboxState = !prev;
      
      // Lock or unlock scrolling based on the new state
      document.body.style.overflow = newLightboxState ? 'hidden' : 'auto';
  
      return newLightboxState;
    });
  }

  return (
    <div className="carousel" {...handlers}>
    {lightbox &&<ImageLightbox image={images[currentIndex]} close={() => setLightbox(false)} />}
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`}  onClick={ () => handleClick()}/>
        ))}
      </div>
      <button onClick={goToPrevious} className="left-arrow">&lt;</button>
      <button onClick={goToNext} className="right-arrow">&gt;</button>
    </div>
  );
}

export default ImageCarousel;
