import React from "react";
import '../CSS/ImageLightbox.css';

function ImageLightbox({ image, close }) {
    return (
        <div className="lightbox" onClick={close}>
        <img src={image} alt="Lightbox" />
        </div>
    );
    }

export default ImageLightbox;