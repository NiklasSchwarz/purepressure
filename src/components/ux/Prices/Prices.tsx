"use client"

import './Prices.css'

import React, { useRef } from 'react';
import PriceCard from './Card';
import useResolution from '@/components/services/Functions/ResolutionCheck';
import { motion, useScroll } from 'framer-motion';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  service?: string[];
  imageAlt?: string;
  heading?: string;
  text?: string;
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const Price: React.FC<ContentSectionProps> = ({ service, imageAlt, heading, text }) => {
  const resolution = useResolution()
    const ref1 = useRef<HTMLDivElement | null>(null)
    const ref2 = useRef<HTMLDivElement | null>(null)
    const ref3 = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress:scrollProgress1 } = useScroll({
        target: ref1,
        offset: (resolution == 0) ? ["0.7 1", "0.9 1"] : (
                  resolution == 1 ? ["0.8 1", "0.9 1"] : ["0.8 1", "1.2 1"] 
                )
    });
    const { scrollYProgress:scrollProgress2 } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0.8 1", "0.95 1"] : (
                resolution == 1 ? ["0.8 1", "0.95 1"] : ["0.8 1", "1.8 1"] 
              )
    });
    const { scrollYProgress:scrollProgress3 } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0.8 1", "1 1"] : (
                resolution == 1 ? ["0.8 1", "1 1"] : ["0.8 1", "3.5 1"] 
              )
    });


  return (
    <div className="uxPricesContainer">
      <motion.div className='w-full min-w-[300px] min-[1024px]:w-[30%] min-[1024px]:max-w-[380px]' ref={ref1} style={{scale:scrollProgress1, opacity:scrollProgress1}}>
        <PriceCard cost={120} title={'Basic Interior'} details={'Interior cleaning package'} features={['Deep cleaning of seats', 'Carpet shampooing', 'Full vacuum service', 'Full interior scrub']}></PriceCard>
      </motion.div>
      <motion.div className='w-full min-w-[300px] min-[1024px]:w-[30%] min-[1024px]:max-w-[380px]' ref={ref2} style={{scale:scrollProgress2, opacity:scrollProgress2}}>
        <PriceCard cost={200} title={'Pure Deep Clean'} details={'Ultimate package that includes all the basics plus more'} features={['Deep cleaning of seats', 'Carpet shampooing', 'Full vacuum service', 'Hair removal', 'Deep cleaning of dashboards and doors', 'Full exterior wash and scrub', 'Snow foam', 'Bug sap and tar removal', 'Tire shine', 'Ceramic coating']}></PriceCard>
      </motion.div>
      <motion.div className='w-full min-w-[300px] min-[1024px]:w-[30%] min-[1024px]:max-w-[380px]' ref={ref3} style={{scale:scrollProgress3, opacity:scrollProgress3}}>
       <PriceCard cost={120} title={'Basic Exterior'} details={'Exterior cleaning and coating package'} features={['Full exterior wash and scrub', 'Snow foam', 'Bug sap and tar removal', 'Tire cleaning', 'Tire shine', 'Ceramic coating']}></PriceCard>
      </motion.div>
    </div>
  );
};

export default Price;
