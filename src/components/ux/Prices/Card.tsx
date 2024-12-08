import { div, p } from 'framer-motion/client';
import './Prices.css'

import React from 'react';
import { FaCheckCircle, FaBookmark } from 'react-icons/fa';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  cost: number;
  title: string;
  details: string;
  features: string[];
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const PriceCard: React.FC<ContentSectionProps> = ({ cost, title, details, features }) => {
  return (
    <div className={`uxPriceCard ${cost == 200 ? "border-red-400": "border-gray-200"}`}>
        <FaBookmark className={`relIcon ${cost == 200 ? "text-red-400": "text-gray-300"}`}/>
        <div className="head">
            <h3 className='mb-2'>{title}</h3>
            <p className='mb-6'>{details}</p>
            <p><span className='text-3xl font-semibold text-dark'>${cost}</span> / once</p>
            {cost === 200 && (<p className='text-red-400'>- $40 Sale</p>)} 
        </div>
        <div className="body">
            {features.map((element, index) => (
                <div key={index} className='flex gap-4 mb-4'><FaCheckCircle className='h-[20px] min-w-[20px] text-green-400'/><p key={index}>{element}</p></div>
            ))}
        </div>
    </div>
  );
};

export default PriceCard;
