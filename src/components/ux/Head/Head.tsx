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
    <div className="uxHead pl-16">
      <div className="uxHeadContent -ml-[1px]">
        <div className="uxHeadText pb-16">
          <h1 className='whitespace-normal text-7xl leading-tight'>{heading}</h1>
          <p className='text-xl font-light'>Kennen Sie <span className='text-red-400'>lange Durchlaufzeiten</span> oder <span className='text-red-400'>hohe Beschaffungskosten</span>? <b className='font-medium'>Die ATBS nicht.</b></p>
          <a className="mt-4 flex flex-row overflow-hidden gap-4 items-center rounded-full bg-red-300 hover:bg-red-400 relative group transition-all duration-500 ease-in-out px-12 py-4 shadow-xl w-[200px] cursor-pointer" href=""><FaChevronCircleRight className='absolute right-[87%] transition-all duration-500 group-hover:right-[5%] group-hover:rotate-180 cursor-pointer'/><p className='transition-all duration-500 absolute -right-[20%] group-hover:-right-[8%] w-full cursor-pointer text-dark'>Angebot anfordern</p></a>
        </div>
        <div className="uxHeadInformation relative w-[135%] xl:w-[120%] bg-bg rounded-tr-[40px] pt-[80px] pr-[40px] pb-[40px]">
            <h2 className='font-normal leading-tight'>Hier steht etwas, weshlab wir die besten sind und ein alleinstellungsmerkmla ojnqeprig qepirhg pq rqieürbqeriüj vqepirj vqeirpj vqerüijv qerüij </h2>
        </div>
      </div>
      <Image className='uxHeadImage' src={imageSrc} alt={imageAlt} width={400} height={400}/>
    </div>
  );
};

export default Head;
 