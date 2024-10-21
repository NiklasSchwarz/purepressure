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
        <h2 className='break-words'>{heading}<br/><br/></h2>
        <p>{text}</p>
      </div>
      <div className="uxTextImgImg">
        <Image src={imageSrc} alt={imageAlt} layout="responsive" width={700} height={400} />
      </div>
    </div>
  );
};

export default TextImage;
