import './TextImage.css'

import React from 'react';
import Image from 'next/image';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  text: string;
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const TextImage: React.FC<ContentSectionProps> = ({ imageSrc, imageAlt, heading, text }) => {
  return (
    <div className="uxTextImg">
      <div className="uxTextImgText">
        <h1 className='break-words'>{heading}<br/><br/></h1>
        <p>{text}</p>
      </div>
        <Image src={imageSrc} alt={imageAlt} width={700} height={400} className='uxTextImgImg' />
    </div>
  );
};

export default TextImage;
