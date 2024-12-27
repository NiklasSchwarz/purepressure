import { div, p } from 'framer-motion/client';
import './Prices.css'

import React from 'react';
import { FaCheckCircle, FaBookmark } from 'react-icons/fa';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  title: string;
  costs: number[]
  features: string[];
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const PriceCard: React.FC<ContentSectionProps> = ({ title, costs, features }) => {
  return (
    <div className={`uxPriceCard border-gray-200`}>
        <div className="head">
            <h3 className='mb-2'>{title}</h3>
            <p className='min-[501px]:hidden font-semibold'>S / M / L</p>
            <p className='min-[501px]:hidden font-semibold'>$ {costs[0]} / $ {costs[1]} / $ {costs[2]}</p>
        </div>
        <div className="body-item">
            {features.map((element, index) => (
                <div key={index} className='flex gap-4 mb-4'><p key={index} className='m-auto'>{element}</p></div>
            ))}
        </div>
    </div>
  );
};

export default PriceCard;
