'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import './SliderService.css'

import React, { useEffect, useRef, useState } from 'react';
import { FaFire, FaCube, FaDraftingCompass, FaTeeth, FaScrewdriver, FaCircleNotch, FaHardHat, FaBrush} from 'react-icons/fa';
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
      offset: (resolution == 0) ? ["0.8 1", "1.2 1"] : (
                resolution == 1 ? ["0.8 1", "1.8 1"] : ["0.8 1", "1.8 1"] 
              )
  });
  const { scrollYProgress:scrollProgress2 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "1.5 1"] : (
              resolution == 1 ? ["0.8 1", "2.1 1"] : ["0.8 1", "2.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress3 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "1.8 1"] : (
              resolution == 1 ? ["0.8 1", "2.4 1"] : ["0.8 1", "3.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress4 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "2.1 1"] : (
              resolution == 1 ? ["0.8 1", "2.7 1"] : ["0.8 1", "4.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress5 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "2.5 1"] : (
              resolution == 1 ? ["0.8 1", "3 1"] : ["0.8 1", "5.8 1"] 
            )
  });
  const { scrollYProgress:scrollProgress6 } = useScroll({
    target: ref1,
    offset: (resolution == 0) ? ["0.8 1", "3 1"] : (
              resolution == 1 ? ["0.8 1", "3.4 1"] : ["0.8 1", "6.8 1"] 
            )
  });


  return (
      <div className="slider_container">
        <div className='slider_image'>
          <div className="slider_heading">
            <h2 className='text-5xl leading-tight'>Einfaches <br/><span className='text-blue-300'>Leistungs-<br/></span>portfolio</h2>
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
            <FaCube className='text-5xl text-blue-300 p-2 rounded-xl border-blue-300 border-[2px] shadow-xl'/>
            <h4>Kanttechnik</h4>
          </div>
          <p>Unsere Kanttechnik besteht aus modernen CNC-Abkantpressen aus dem Hause Trumpf. Wir kanten Bleche bis zu einer Länge von 4 Metern. Uns stehen dabei Kräfte bis zu 320 Tonnen zur Verfügung.</p>
        </motion.div>
        <motion.div className="slider_card" ref={ref2} style={{scale:scrollProgress2, opacity:scrollProgress2}}>
          <div className="slider_card_heading">
            <FaTeeth className='text-5xl text-yellow-300 p-2 rounded-xl border-yellow-300 border-[2px] shadow-xl'/>
            <h4>Laserschneidtechnik</h4>
          </div>
          <p>Unsere Laseranlagen haben ein Leistungsvermögen von 4 KW bis 6 KW. Wir arbeiten mit CO2- und Faserlasern. Es können Blechformate bis zu 2 x 4 Meter verarbeitet werden. Um den Zuschnittprozess weiter zu optimieren, hat ATBS in Automatisierung investiert. Zwei von drei Laserschneidanlagen werden von einem Liftmaster Be- und Entladen.</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref3} style={{scale:scrollProgress3, opacity:scrollProgress3}}>
          <div className="slider_card_heading">
            <FaCircleNotch className='text-5xl text-green-300 p-2 rounded-xl border-green-300 border-[2px] shadow-xl'/>
            <h4>Zerspanungstechnik</h4>
          </div>
          <p>Unsere Zerspanung besteht aus konventionellen Drehmaschinen, CNC-Zentren sowie mehreren 5-Achs-3D-Bearbeitung für NC-Daten, DXF-Daten oder Einzelprogrammierung (Verfahrweg 3000x1200x1500 oder verschiedene Arbeitsflächen)</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref4} style={{scale:scrollProgress4, opacity:scrollProgress4}}>
          <div className="slider_card_heading">
            <FaDraftingCompass className='text-5xl text-slate-400 p-2 rounded-xl border-slate-400 border-[2px] shadow-xl'/>
            <h4>Tragwerksplanung</h4>
          </div>
          <p>Durch unseren zugelassenen Tragwerksplaner sind wir in der Lage, Standsicherheitsnachweise zu erstellen und Festigkeitsnachweise mit räumlichen Stabwerksprogrammen zu erbringen. Bei ATBS bekommen Sie somit alles aus einer Hand.</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref5} style={{scale:scrollProgress5, opacity:scrollProgress5}}>
          <div className="slider_card_heading">
            <FaFire className='text-5xl text-red-300 p-2 rounded-xl border-red-300 border-[2px] shadow-xl'/>
            <h4>Brennschneiden</h4>
          </div>
          <p>Mit unserer BCS Multi aus dem Hause Bach sind wir in der Lage, Autogen- und Plasmazuschnitte herzustellen. Verarbeitet werden Bleche bis zu einer Dicke von 120 mm. Durch eine Entgratmaschine erhalten Sie auch in diesem Bereich eine gleichbleibende Blechkantenqualität.</p>
        </motion.div>        
        <motion.div className="slider_card" ref={ref6} style={{scale:scrollProgress6, opacity:scrollProgress6}}>
          <div className="slider_card_heading">
            <FaBrush className='text-5xl text-purple-300 p-2 rounded-xl border-purple-300 border-[2px] shadow-xl'/>
            <h4>Oberflächenbehandlung</h4>
          </div>
          <p>Durch einen großen und schlagkräftigen Lieferantenpool sind wir in der Lage, Ihre Produkte oberflächenveredelt anzubieten. Lackierung, Pulverbeschichtung, Feuerverzinkung oder Galvanik, auch hier sind Sie bei ATBS absolut an der richtigen Adresse.</p>
        </motion.div> 
        <motion.div className="slider_card" ref={ref6} style={{scale:scrollProgress6, opacity:scrollProgress6}}>
          <div className="slider_card_heading">
            <FaScrewdriver className='text-5xl text-teal-300 p-2 rounded-xl border-teal-300 border-[2px] shadow-xl'/>
            <h4>Baugruppenfertigung</h4>
          </div>
          <p>Unser Maschinenpark beinhaltet die komplette Prozesskette in der Blechbearbeitung. Somit sind wir in der Lage, ihre Produkte für Sie aus einer Hand zu fertigen. Ob Schweißbaugruppen oder Montagetätigkeiten an bereits oberflächenveredelten Bauteilen, auch hier haben Sie mit ATBS einen zuverlässigen und erfahrenen Partner an der Hand.</p>
        </motion.div> 
        <motion.div className="slider_card" ref={ref6} style={{scale:scrollProgress6, opacity:scrollProgress6}}>
          <div className="slider_card_heading">
            <FaHardHat className='text-5xl text-orange-300 p-2 rounded-xl border-orange-300 border-[2px] shadow-xl'/>
            <h4>Konstruktion</h4>
          </div>
          <p>Moderne 3D-CAD-Software sowie geschultes Personal im Hause ATBS ermöglichen es uns, Bauteile und Baugruppen zu entwickeln. Wir optimieren Ihre Produkte unter Berücksichtigung von Funktionalität, Qualität und Kosten. Mögliche Formate Step-Dateien, iges, dxf, dwg sowie stl.</p>
        </motion.div> 
      </div>
    </div>
  );
};

export default SliderTxt;
