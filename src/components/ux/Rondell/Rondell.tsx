'use client'

import './Rondell.css'
import { v4 as uuidv4 } from "uuid"; 
import Card from "./Card"; 
import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('./Carousel'), { ssr: false });

function Rondell() {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-9001.png" 
              title="DIN EN ISO 9001"
              text="Anforderungen an ein Qualitätsmanagement System zur Sicherstellung von Kundenzufriedenheit und kontinuierlicher Qualität" 
         />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/exc3.svg" 
              title="DIN EN ISO 3834-2" 
              text="Qualitätsanforderungen für das Schemlzschweißen von metallischen Werkstoffen"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-15085.png" 
              title="EN 15085-2 Kl. CL1" 
              text="Schweißen von Schienenfahrzeugen und Schienenfahrzeugteilen"
         />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-ad2000.png" 
              title="AD 2000 HP0" 
              text="Herstellungsberechtigt für Druckgeräte und Druckgeräteteile sowie Rohrleitungen und Rohrleitungsteile"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert-ad2000.png" 
              title="DGRL 97/23/EG"
              text="Umstempelungsberechtigt gemäß Druckgeräterichtline nach AD 2000" 
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/images/certificates/cert10903.png" 
              title="EN 1090-3:2019 EXC3"
              text="Schweißzulassung für Aluminiumtragwerken beanspruchter Bauteile oder Tragwerke" 
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
  return (
    <div className="uxRondell flex flex-col w-full items-center justify-center 
      lg:flex-row lg:justify-evenly ">
        <div className="text-center lg:text-left w-4/5 lg:w-1/3 lg:my-auto lg:pr-5">
            <h2 className='hyphens-auto break-words whitespace-normal mb-12 lg:mb-4'>Unsere Qualitäts- und Fertigungs&shy;zertifikate  </h2> <br/>
            <p className='mb-32'>Unsere Produkte und Dienstleistungen unterliegen strengen Qualitätskontrollen und erfüllen sämtliche relevanten Zertifizierungsanforderungen. Durch unsere umfassenden Zertifizierungen garantieren wir nicht nur die Konformität mit internationalen Normen, sondern auch die kontinuierliche Verbesserung und Zuverlässigkeit unserer Prozesse. </p>
        </div>
        <Carousel
        cards={cards}
        height="500px"
        width="30%"
        offset={2}
        showArrows={false}
      />
    </div>
  );
}

export default Rondell;
