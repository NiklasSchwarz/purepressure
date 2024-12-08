"use client"
import './BeforeAfterImg.css'

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  foregroundImg: string;
  backgroundImg: string;
}

// Erstelle die Funktionale Komponente
const TextImage: React.FC<ContentSectionProps> = ({ foregroundImg, backgroundImg }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(Number(event.target.value) >= 85) {
        setValue(85);
    } else if(Number(event.target.value) <= 15) {
        setValue(15);
    } else {
        setValue(Number(event.target.value));
    }
  }

  return (
    <div className='BeforeAfterContainer'>
        <Image className='img background-img ' src={backgroundImg} alt={'Comparison 1'} width={900} height={500}></Image>
        <Image className='img foreground-img' style={{clipPath: `inset(0 ${100 - value}% 0 0)`,
        }} src={foregroundImg} alt={'Comparison 1'} width={900} height={500}></Image>
        <input type="range" min="1" max="100" value={value} className="slider" name='slider' id="slider" onChange={handleChange}></input>
        <div className="slider-button" style={{left: `calc(${value}% - 18px)`}}></div>
  </div>
  );
};

export default TextImage;
