"use client"
import './TrashClean.css'

import React, { useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import BeforeAfterImg from '../BeforeAfterImg/BeforeAfterImg';
import useResolution from '@/components/services/Functions/ResolutionCheck';
import { motion, useScroll } from 'framer-motion';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  text: string;
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
function TrashClean()  {
    const resolution = useResolution()
    const ref1 = useRef<HTMLDivElement | null>(null)
    const ref2 = useRef<HTMLDivElement | null>(null)
    const ref3 = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress:scrollProgress1 } = useScroll({
        target: ref1,
        offset: (resolution == 0) ? ["0.8 1", "1.1 1"] : (
                  resolution == 1 ? ["0.8 1", "1.2 1"] : ["0.8 1", "1.2 1"] 
                )
    });
    const { scrollYProgress:scrollProgress2 } = useScroll({
      target: ref2,
      offset: (resolution == 0) ? ["0.8 1", "1.3 1"] : (
                resolution == 1 ? ["0.8 1", "1.5 1"] : ["0.8 1", "1.5 1"] 
              )
    });
    const { scrollYProgress:scrollProgress3 } = useScroll({
      target: ref3,
      offset: (resolution == 0) ? ["0.8 1", "1.6 1"] : (
                resolution == 1 ? ["0.8 1", "1.7 1"] : ["0.8 1", "2 1"] 
              )
    });

    return (
        <div className='w-full flex flex-row justify-between gap-10 max-[981px]:flex-col-reverse rounded-[40px] bg-slate-200'>
            <div className="min-[982px]:w-[40%]">
            <BeforeAfterImg foregroundImg={'/images/bins/Before_bin.jpeg'} backgroundImg={'/images/bins/After_bin.jpeg'}></BeforeAfterImg>
            </div>
            <div className="min-[982px]:w-[60%] flex flex-col justify-evenly p-8">
            <div>
                <h1 className='min-[982px]:max-w-[400px]'>Wheely <span className='text-blue-500'>Trash Can</span> Clean</h1>
                <h4 className='mt-8 text-neutral font-light mb-12 w-[80%] pl-2'>Play your part in keeping Hawaii clean and beautiful for everyone to enjoy.</h4>
            </div>
            <div className="flex flex-row w-full justify-around flex-wrap gap-x-4 min-[1050px]:gap-x-12 gap-y-4">
                <motion.div className="w-full min-[463px]:w-[200px] py-12 rounded-xl text-center shadow-lg max-[981px]:m-auto bg-gray-50" ref={ref1} style={{scale:scrollProgress1, opacity:scrollProgress1}}>
                    <FaTrash className='text-3xl m-auto mb-4 text-orange-200' ></FaTrash>
                    <h4>Monthly</h4>
                    <h4 className='font-light text-neutral mt-2'>$9</h4>
                </motion.div>
                <motion.div className="w-full min-[463px]:w-[200px] py-12 rounded-xl text-center shadow-lg max-[981px]:m-auto bg-gray-50" ref={ref2} style={{scale:scrollProgress2, opacity:scrollProgress2}}>
                    <FaTrash className='text-3xl m-auto mb-4 text-green-300'></FaTrash>
                    <h4>Bi-Monthly</h4>
                    <h4 className='font-light text-neutral mt-2'>$15</h4>
                </motion.div>
                <motion.div className="w-full min-[463px]:w-[200px] py-12 rounded-xl text-center shadow-lg max-[981px]:m-auto bg-gray-50" ref={ref3} style={{scale:scrollProgress3, opacity:scrollProgress3}} >
                    <FaTrash className='text-3xl m-auto mb-4 text-gray-300'></FaTrash>
                    <h4>Once</h4>
                    <h4 className='font-light text-neutral mt-2'>$39</h4>
                </motion.div>
            </div>
            </div>
        </div>
    );
};

export default TrashClean;
