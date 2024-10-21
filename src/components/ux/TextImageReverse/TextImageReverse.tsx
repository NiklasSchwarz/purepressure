import './TextImageReverse.css'

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
const TextImageReverse: React.FC<ContentSectionProps> = ({ imageSrc, imageAlt, heading, text }) => {
  return (
    <div className="uxTextImgReverse">
      <div className="uxTextImgReverseImg">
        <Image src={imageSrc} alt={imageAlt} layout="responsive" width={700} height={400} />
      </div>
      <div className="uxTextImgReverseText">
        <h2>{heading}<br/><br/></h2> 
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextImageReverse;
