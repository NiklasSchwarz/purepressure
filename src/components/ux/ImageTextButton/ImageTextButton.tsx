import './ImageTextButton.css'

import React from 'react';
import Image from 'next/image';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  text: string;
}

// Erstelle die Funktionale Komponente
const ImageText: React.FC<ContentSectionProps> = ({ imageSrc, imageAlt, heading, text }) => {
  const text_array : string[] = text.split(' | ')
  
  return (
    <section className="uxImageTextButton">
      <div className="uxImageTextButtonImg">
        <Image className='uxImage' src={imageSrc} alt={imageAlt} width={400} height={400} />
      </div>
      <div className="uxImageTextButtonText">
        <h2>{heading}</h2>
        {text_array.map((text_item, index) => (
          <p key={index}><br/>{text_item}</p>
        ))}
        <a href="/contact"><div className='uxImageTextButtonBtn'>Zu den Neuigkeiten</div></a>
      </div>
    </section>
  );
};

export default ImageText;
