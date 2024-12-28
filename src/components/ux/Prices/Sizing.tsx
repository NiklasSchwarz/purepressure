import React, { useRef } from 'react';
import useResolution from '@/components/services/Functions/ResolutionCheck';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  children?: React.ReactNode; 
}

// Erstelle die Funktionale Komponente
const Sizing: React.FC<ContentSectionProps> = () => {

  return (
    <div className="flex max-[950px]:flex-col w-full justify-between gap-6">
        <h1 className='w-full min-[951px]:w-[25%]'>Sizing <span className='text-red-300'>Guide:</span></h1>
        <div className="flex max-[550px]:flex-col justify-evenly w-[75%] max-[950px]:w-full gap-8">
            <div className="rounded-3xl shadow-lg bg-green-50 p-8 flex flex-col justify-center items-center text-center">
                <h3 className='pb-4'>Small</h3>
                <p>Two-seater cars and smaller vehicles.</p>
            </div>
            <div className="rounded-3xl shadow-lg bg-blue-50 p-8 flex flex-col justify-center items-center text-center">
                <h3 className='pb-4'>Medium</h3>
                <p>Sedans, hatchbacks, and most standard-sized cars.</p>
            </div>
            <div className="rounded-3xl shadow-lg bg-red-50 p-8 flex flex-col justify-center items-center text-center">
                <h3 className='pb-4'>Large</h3>
                <p>SUVs, vans, trucks, 4Runners and other larger vehicles.</p>
            </div>
        </div>
    </div>

    
  );
};

export default Sizing;
