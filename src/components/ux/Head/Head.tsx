import './Head.css'

import React from 'react';
import Image from 'next/image';

import { FaRegCheckSquare } from 'react-icons/fa';

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
      <div className='uxHeadImageContainer'>
        <Image className='uxHeadImage' src={imageSrc} alt={imageAlt} width={400} height={400} />
      </div>
      <div className="uxHeadText">
        <h1 className='whitespace-normal uppercase'>{heading}</h1>
        <p className='text-xl font-light'>{subtitle}</p>
        <div className='flex flex-row justify-center w-full flex-wrap gap-y-8'>
          <div className='flex flex-row items-center px-6 py-3 border-solid rounded-md bg-light bg-opacity-50 pointer-events-none mx-4 text-light font-semibold text-lg'>
            <FaRegCheckSquare className='mr-4 w-7 h-7 text-green-700' /> Aluminium
          </div>
          <div className='flex flex-row items-center px-6 py-3 border-solid rounded-md bg-light bg-opacity-50 pointer-events-none mx-4 text-gray-600 font-semibold text-lg'>
            <FaRegCheckSquare className='mr-4 w-7 h-7 text-green-700' /> Stahl
          </div>
          <div className='flex flex-row items-center px-6 py-3 border-solid rounded-md bg-light bg-opacity-50 pointer-events-none mx-4 text-amber-300 font-semibold text-lg'>
            <FaRegCheckSquare className='mr-4 w-7 h-7 text-green-700' /> Messing
          </div>
          <div className='flex flex-row items-center px-6 py-3 border-solid rounded-md bg-light bg-opacity-50 pointer-events-none mx-4 text-slate-300 font-semibold text-lg'>
            <FaRegCheckSquare className='mr-4 w-7 h-7 text-green-700'  /> Edelstahl
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
