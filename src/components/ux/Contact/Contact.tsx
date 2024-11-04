"use client"

import Image from 'next/image';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './Contact.css'
import useResolution from '@/components/services/Functions/ResolutionCheck';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  heading: string;
  text: string;
  image: string;
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const Contact: React.FC<ContentSectionProps> = ({ heading, text, image }) => {
  const resolution = useResolution()
  const ref1 = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress:scrollProgress } = useScroll({
      target: ref1,
      offset: (resolution == 0) ? ["0 1", "0.8 1"] : (
               resolution == 1 ? ["0 1", "0.7 1"] : ["0 1", "0.6 1"] 
              )
  });

  const transformedScroll1 = useTransform(scrollProgress, [0, 1], [0.75, 1]);

  return (
    <motion.div className='w-full' ref={ref1} style={{scale:transformedScroll1, opacity:transformedScroll1}} >
      <div className="contact">
        <div className='contact_text'>
          <h1 className='text-dark lg:w-9/10'>{heading}<br/><br/></h1>  
          <p className='text-gray-500'>{text}</p> 
        </div>
        <div className="relative overflow-hidden h-full lg:h-auto w-full lg:w-[45%]">
          <Image src={image}
              alt="Image Card"
              width={600}
              height={600}
              loading="lazy"
              className="contact_image"
          /> 
          <div className='contact_btn'>
            <div className="pt-4 pl-4">
              <a href="/contact" className="contact_btn_content"><FaAngleDoubleRight/>Kontakt</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
