import React, { useState, useEffect } from 'react';
import '../CSS/ImageLightbox.css';
import { useSwipeable } from 'react-swipeable';

function ImageLightbox({ images, close }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageStatus, setImageStatus] = useState('fade-enter');

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const goToPrevious = (e) => {
        if (e)
        e.stopPropagation();
        changeImage((currentIndex === 0 ? images.length - 1 : currentIndex - 1));
    };

    const goToNext = (e) => {
        if (e)
        e.stopPropagation();
        changeImage((currentIndex === images.length - 1 ? 0 : currentIndex + 1));
    };

    
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

        

    const changeImage = (newIndex) => {
        setImageLoaded(false); // Reset load status
        setImageStatus('fade-exit');
        setTimeout(() => {
            setCurrentIndex(newIndex);
        }, 300); // This timeout duration should match the CSS transition time
    };

    const handleImageLoaded = () => {
        setImageLoaded(true);
        setImageStatus('fade-enter');
    };

    return (
        <div className="lightbox" {...handlers} onClick={close}>
            {!imageLoaded && <div className='lightbox-loading-text'>Loading</div>}
            <div className={imageStatus}>
                <img
                    src={images[currentIndex]}
                    alt="Displayed Image"
                    onLoad={handleImageLoaded}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                />
            </div>
            <button onClick={goToPrevious} className="left-arrow">&lt;</button>
            <button onClick={goToNext} className="right-arrow">&gt;</button>
        </div>
    );
}

export default ImageLightbox;
