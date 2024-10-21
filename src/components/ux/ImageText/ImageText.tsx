'use client'

import './ImageText.css'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  heading: string;
  text: string;
  images: string[];
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const ImageText: React.FC<ContentSectionProps> = ({ images, heading, text }) => {
  const text_array : string[] = text.split(' | ')
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

    // useEffect für den automatischen Bildwechsel alle 5 Sekunden
    useEffect(() => {
      const intervalId = setInterval(() => {
        goToNext();
      }, 5000); // 5 Sekunden für den automatischen Bildwechsel
  
      // Clean-up function, um das Intervall zu löschen, wenn die Komponente unmountet wird
      return () => clearInterval(intervalId);
    }, [currentIndex]); // Das Intervall wird aktualisiert, wenn der currentIndex sich ändert
  
  
  return (
    <section className="uxImageText">
      <div className="slider">
        <div className="slider-content">
          <button onClick={goToPrevious} className="prev-button">←</button>
          <div className='slider-image'>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={index === currentIndex ? 'active' : ''}
            />
          ))}
        </div>
          <button onClick={goToNext} className="next-button">→</button>
        </div>
        <div className="dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <div className="uxImageTextText">
        <h2>{heading}</h2>
        {text_array.map((text_item, index) => (
          <p key={index}><br/>{text_item}</p>
        ))}
      </div>
    </section>
  );
};

export default ImageText;
