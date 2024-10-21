import './Contact.css'

import React from 'react';
import { FaComments } from 'react-icons/fa'

// Definiere die Props für die Komponente
interface ContentSectionProps {
  heading: string;
  text: string;
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const Contact: React.FC<ContentSectionProps> = ({ heading, text }) => {
  const text_array : string[] = text.split(' | ')

  return (
    <div className="uxContact">
      <div className='uxContactText relative'>
        <FaComments className='absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 -z-10 w-full h-full scale-150 opacity-10 text-dark' />
        <h2>{heading}<br/><br/></h2>  
        {text_array.map((text_item, index) => (
          <p key={index}>{text_item}</p>
        ))}
      </div>
      <a href="/contact"><div className='uxContactBtn'>Kontaktieren Sie uns</div></a>
    </div>
  );
};

export default Contact;
