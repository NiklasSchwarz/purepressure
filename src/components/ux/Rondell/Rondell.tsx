'use client'

import './Rondell.css'
import { v4 as uuidv4 } from "uuid"; 
import Card from "./Card"; 
import dynamic from 'next/dynamic';
import useResolution from '@/components/services/Functions/ResolutionCheck';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const Carousel = dynamic(() => import('./Carousel'), { ssr: false });

function Rondell() {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-9001.png" 
              title="DIN EN ISO 9001"
              text="Anforderungen an ein Qualitätsmanage&shy;ment System zur Sicherstellung von Kundenzufriedenheit und kontinuierlicher Qualität" 
         />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/exc3.svg" 
              title="DIN EN ISO 3834-2" 
              text="Qualitätsanforder&shy;ungen für das Schemlzschweißen von metallischen Werkstoffen"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-15085.png" 
              title="EN 15085-2 Kl. CL1" 
              text="Schweißen von Schienenfahrzeugen und Schienenfahrzeug&shy;teilen"
         />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-ad2000.png" 
              title="AD 2000 HP0" 
              text="Herstellungsberech&shy;tigt für Druckgeräte und Druckgeräteteile sowie Rohrleitungen und Rohrleitungsteile"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-ad2000.png" 
              title="DGRL 97/23/EG"
              text="Umstempelungs&shy;berechtigt gemäß Druckgeräterichtline nach AD 2000" 
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert10903.png" 
              title="EN 1090-3:2019 EXC3"
              text="Schweißzulassung für Aluminiumtrag&shy;werken beanspruchter Bauteile oder Tragwerke" 
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/exc3.svg" 
              title="EN 1090-2:2018 EXC3"
              text="Schweißzulassung für Stahltragwerken beanspruchter Bauteile oder Tragwerke bis zur Festigkeitsklasse S700" 
        />
      )
    }
  ];
  const resolution = useResolution()
  const ref1 = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress:scrollProgress } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0 1", "0.8 1"] : (
                resolution == 1 ? ["0 1", "0.6 1"] : ["0 1", "0.5 1"] 
              )
  });

  const transformedScroll1 = useTransform(scrollProgress, [0, 1], [0.75, 1]);

  return (
      <motion.div className="w-full" ref={ref1} style={{scale:transformedScroll1, opacity:transformedScroll1}} >
        <div className="uxRondell">
            <div className="w-full xl:w-[55%]">
              <h1 className='rondell_heading text-dark'>Unsere Qualitäts- und Fertigungs&shy;zertifikate.</h1>
              <p className='rondell_text text-gray-500'>Unsere Produkte und Dienstleistungen unterliegen strengen Qualitätskontrollen und erfüllen sämtliche relevanten Zertifizierungs&shy;anforderungen. Durch unsere umfassenden Zertifizierungen garantieren wir nicht nur die Konformität mit internationalen Normen, sondern auch die kontinuierliche Verbesserung und Zuverlässigkeit unserer Prozesse. </p>
            </div>
            <div className="rondell_container">
              <Carousel
                cards={cards}
                height="550px"
                width="90%"
                offset={2}
                showArrows={false}
            />
            </div>
        </div>
      </motion.div>
  );
}

export default Rondell;
