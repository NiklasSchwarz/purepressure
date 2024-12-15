import './Head.css'

import React from 'react';
import Image from 'next/image';

import { FaChevronCircleRight } from 'react-icons/fa';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  subtitle: string;
  text: string;
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const Head: React.FC<ContentSectionProps> = ({ imageSrc, imageAlt, heading, text , subtitle}) => {
  return (
    <div className="uxHead">
      <div className="uxHeadContent">
        <div className="uxHeadText pb-16">
          <h1 className='mb-8 scale-110 font-extrabold'>{heading}</h1>
          <h2>{subtitle}</h2>
          <p className='scale-110'>{text}</p>
          <a className="mt-12 mx-auto flex flex-row overflow-hidden gap-4 items-center rounded-full bg-blue-300 hover:bg-blue-400 relative group transition-all duration-500 ease-in-out px-12 py-8 shadow-xl w-[230px] cursor-pointer" href="/booking"><FaChevronCircleRight className='absolute right-[87%] transition-all duration-500 group-hover:right-[5%] group-hover:rotate-180 cursor-pointer'/><p className='transition-all duration-500 -mt-[2px] absolute -right-[5%] group-hover:right-[5%] w-full cursor-pointer'>Book an Appointment</p></a>
        </div>
      </div>
      <Image className='uxHeadImage' src={imageSrc} alt={imageAlt} width={400} height={400}/>
    </div>
  );
};

export default Head;
 