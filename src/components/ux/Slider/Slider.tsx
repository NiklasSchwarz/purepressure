'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import './Slider.css'

import React, { useEffect, useRef, useState } from 'react';
import { FaHourglassHalf, FaRobot, FaRulerCombined, FaDolly, FaCogs, FaClipboardCheck } from 'react-icons/fa';
import useResolution from '@/components/services/Functions/ResolutionCheck';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  images: string[];
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const SliderTxt: React.FC<ContentSectionProps> = ({ images }) => {
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
  const resolution = useResolution()
  const ref1 = useRef<HTMLDivElement | null>(null)
  const ref2 = useRef<HTMLDivElement | null>(null)
  const ref3 = useRef<HTMLDivElement | null>(null)
  const ref4 = useRef<HTMLDivElement | null>(null)
  const ref5 = useRef<HTMLDivElement | null>(null)
  const ref6 = useRef<HTMLDivElement | null>(null)
  
  const { scrollYProgress:scrollProgress1 } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0.8 1", "1.5 1"] : (
                resolution == 1 ? ["0.8 1", "2 1"] : ["0.8 1", "1.8 1"] 
              )
  });
  const { scrollYProgress:scrollProgress2 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "2 1"] : (
              resolution == 1 ? ["0.8 1", "2.5 1"] : ["0.8 1", "2.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress3 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "2.3 1"] : (
              resolution == 1 ? ["0.8 1", "3 1"] : ["0.8 1", "3.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress4 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "2.7 1"] : (
              resolution == 1 ? ["0.8 1", "3.5 1"] : ["0.8 1", "4.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress5 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "3 1"] : (
              resolution == 1 ? ["0.8 1", "4 1"] : ["0.8 1", "5.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress6 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "3.3 1"] : (
              resolution == 1 ? ["0.8 1", "4.5 1"] : ["0.8 1", "6.8 1"] 
            )
  });


  return (
      <div className="slider_container">
        <div className='slider_image'>
          <div className="slider_heading">
            <h2 className='text-4xl'>Optimierte <br/>
                Fertigung</h2>
          </div>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              loading='lazy'
              className={index === currentIndex ? 'active' : ''}
            />
          ))}
        <div className="slider_dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>    
      <div className="slider_grid">
        <motion.div className="slider_card" ref={ref1} style={{scale:scrollProgress1, opacity:scrollProgress1}}>
          <div className="slider_card_heading">
            <FaRobot className='text-5xl text-blue-300 p-2 rounded-xl border-blue-300 border-[2px] shadow-xl'/>
            <h4>Robotik</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div>
        <motion.div className="slider_card" ref={ref2} style={{scale:scrollProgress2, opacity:scrollProgress2}}>
          <div className="slider_card_heading">
            <FaCogs className='text-5xl text-red-300 p-2 rounded-xl border-red-300 border-[2px] shadow-xl'/>
            <h4>Automatisierung</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref3} style={{scale:scrollProgress3, opacity:scrollProgress3}}>
          <div className="slider_card_heading">
            <FaHourglassHalf className='text-5xl text-green-300 p-2 rounded-xl border-green-300 border-[2px] shadow-xl'/>
            <h4>Optimierte Durchlaufzeiten</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref4} style={{scale:scrollProgress4, opacity:scrollProgress4}}>
          <div className="slider_card_heading">
            <FaDolly className='text-5xl text-slate-400 p-2 rounded-xl border-slate-400 border-[2px] shadow-xl'/>
            <h4>Effiziente Logistik</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref5} style={{scale:scrollProgress5, opacity:scrollProgress5}}>
          <div className="slider_card_heading">
            <FaRulerCombined className='text-5xl text-purple-300 p-2 rounded-xl border-purple-300 border-[2px] shadow-xl'/>
            <h4>Präzision</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref6} style={{scale:scrollProgress6, opacity:scrollProgress6}}>
          <div className="slider_card_heading">
            <FaClipboardCheck className='text-5xl text-orange-300 p-2 rounded-xl border-orange-300 border-[2px] shadow-xl'/>
            <h4>Qualitätssicherung</h4>
          </div>
          <p>Hier steht ein schöner Text über die eine Maschine pknwegüjk nowje j weüoj gwüoej güwj oüewj gwoüej gwe wej gwoej oj oj oewnownoweioweg weofnoiin weinoü oüwentoü  iwe+gi üoiewn</p>
        </motion.div> 
      </div>
    </div>
  );
};

export default SliderTxt;
