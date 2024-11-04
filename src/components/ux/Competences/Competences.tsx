'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import './Competences.css'

import React, { useEffect, useRef, useState } from 'react';
import { FaTrain, FaUtensils, FaSolarPanel, FaAngleDoubleRight } from 'react-icons/fa';
import useResolution from '@/components/services/Functions/ResolutionCheck';
import LogoStripe from '../LogoStripe/LogoStripe';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  images: string[];
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const Competences: React.FC<ContentSectionProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

    // useEffect für den automatischen Bildwechsel alle 5 Sekunden
    useEffect(() => {
      const intervalId = setInterval(() => {
        goToNext();
      }, 5000); // 5 Sekunden für den automatischen Bildwechsel
  
      // Clean-up function, um das Intervall zu löschen, wenn die Komponente unmountet wird
      return () => clearInterval(intervalId);
    }, [currentIndex]); // Das Intervall wird aktualisiert, wenn der currentIndex sich ändert
  
  // Motion variables
  const resolution = useResolution()     // resolution 0 = desktop, 1 => 600 < width < 1270, 2 = mobile
  const ref1 = useRef<HTMLDivElement | null>(null)
  const ref2 = useRef<HTMLDivElement | null>(null)
  const ref3 = useRef<HTMLDivElement | null>(null)
  
  const { scrollYProgress:scrollProgress1 } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0.8 1", "2.5 1"] : (
               resolution == 1 ? ["0.8 1", "2.5 1"] : ["0.8 1", "1.5 1"] 
              )
  });
  const { scrollYProgress:scrollProgress2 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "3.5 1"] : (
             resolution == 1 ? ["0.8 1", "3 1"] : ["0.8 1", "2 1"] 
            )
  });
  const { scrollYProgress:scrollProgress3 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "4.5 1"] : (
             resolution == 1 ? ["0.8 1", "4 1"] : ["0.8 1", "3.5 1"] 
            )
  });

  const transformedScroll1 = useTransform(scrollProgress1, [0, 1], [0, 1]);
  const transformedScroll2 = useTransform(scrollProgress2, [0, 1], [0, 1]);
  const transformedScroll3 = useTransform(scrollProgress3, [0, 1], [0, 1]);

  return (
    <div className='w-full rounded-[40px] bg-slate-200 p-8 sm:p-10 md:p-16 flex gap-16 sm:gap-24 flex-col'>
      <div className="competences_container">
        <div className='competences_heading'>
          <h1 className='text-dark w-full xl:text-5xl text-4xl'>Hier liegt die <span className='text-blue-400 font-semibold leading-snug'>Spezialisierung</span> unserer ATBS.</h1>
          <a href='/carrer' className='flex flex-row gap-2 items-center w-fit hover:text-primary transition-colors bottom-0 text-dark'><FaAngleDoubleRight className='text-blue-300 text-xl'/>sicher dein Angebot</a>
        </div>
      <div className="competences_grid">
        <motion.div className="competences_card" ref={ref1} style={{scale:transformedScroll1, opacity:transformedScroll1}}>
          <FaTrain className='text-9xl text-blue-300 h-[80px] min-w-[80px] md:h-[120px] md:min-w-[120px] rounded-xl p-2 border-blue-300 border-[2px] shadow-xl'/>
          <div className="competences_card_text">
            <h4 className='text-dark'>Schienentechnik</h4>
            <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
          </div>
        </motion.div>
        <motion.div className="competences_card" ref={ref2} style={{scale:transformedScroll2, opacity:transformedScroll2}}>
          <FaUtensils className='text-9xl text-red-300 p-2 h-[80px] min-w-[80px] md:h-[120px] md:min-w-[120px] rounded-xl border-red-300 border-[2px] shadow-xl'/>
          <div className="competences_card_text">
            <h4 className='text-dark'>Großküchentechnik</h4>
            <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
          </div>
        </motion.div>        
        <motion.div className="competences_card" ref={ref3} style={{scale:transformedScroll3, opacity:transformedScroll3}}>
          <FaSolarPanel className='text-9xl text-purple-300 p-2 h-[80px] min-w-[80px] md:h-[120px] md:min-w-[120px] rounded-xl border-purple-300 border-[2px] shadow-xl'/>
          <div className="competences_card_text">
            <h4 className='text-dark'>Energietechnik</h4>
            <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
          </div>
        </motion.div>         
      </div>
      
      </div>
      <LogoStripe 
        heading={'Unsere Partner'} 
        images={["/images/logos/alstom.svg", "/images/logos/mkn.svg", "/images/logos/vw.png", "/images/logos/alstom.svg", "/images/logos/mkn.svg", "/images/logos/vw.png", "/images/logos/alstom.svg", "/images/logos/mkn.svg", "/images/logos/vw.png", "/images/logos/alstom.svg", "/images/logos/mkn.svg", "/images/logos/vw.png"]}/>
    
    </div>
  );
};

export default Competences;
