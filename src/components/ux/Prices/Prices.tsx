import './Prices.css'

import React from 'react';
import PriceCard from './Card';

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
  return (
    <div className="uxPricesContainer">
      <div className='w-full min-w-[200px] border-b min-[501px]:border-r col-start-1 row-start-2'>
        <PriceCard title={'Bronze'} costs={[9,13,17]}features={['Exterior hand wash and dry', 'Comprehensive tire and wheel cleaning']}></PriceCard>
      </div>
      <div className='w-full min-w-[200px] border-b min-[501px]:border-r col-start-1 row-start-3'>
        <PriceCard title={'Silver'} costs={[19,24,29]}features={['Includes bronze services', 'Full vacuum service', 'Bug sap and tar removal']}></PriceCard>
      </div>
      <div className='w-full min-w-[200px] border-b min-[501px]:border-r col-start-1 row-start-4'>
       <PriceCard title={'Gold'} costs={[50,55,59]}features={['Includes silver services', 'Cleaning of dashboard, console and vents', 'Interior glass cleaning', 'Deep shampooing of carpets and floor mats', 'Application of protective shine to vinyl, rubber and plastic sufaces']}></PriceCard>
      </div>
      <div className='w-full min-w-[200px] border-b min-[501px]:border-r col-start-1 row-start-5'>
       <PriceCard title={'Platinum'} costs={[100,120,140]}features={['Includes gold services', 'High gloss tire dressing', 'Steam cleaning', 'Air freshener application', 'Clay bar treatment', 'Ceramic coating']}></PriceCard>
      </div>
      <div className='w-full min-w-[200px] min-[501px]:border-r col-start-1 row-start-6'>
       <PriceCard title={'Showroom'} costs={[150,200,250]}features={['Includes platinum services', 'Specialist seat cleaning', 'Engine bay cleaning', 'Premium-grade wax and sealant application', 'Color and clarity restoration']}></PriceCard>
      </div>
      <div className="max-[500px]:hidden border-b border-r h-full w-full col-start-1 row-start-1"></div>
      <h3 className='max-[500px]:hidden max-[649px]:hidden pb-4 border-b border-r h-full col-start-2 row-start-1 flex items-center justify-center m-auto w-full text-green-400'> Small</h3>
      <h3 className='max-[500px]:hidden max-[649px]:hidden pb-4 border-b border-r h-full col-start-3 row-start-1 flex items-center justify-center m-auto w-full text-blue-300'> Medium</h3>
      <h3 className='max-[500px]:hidden max-[649px]:hidden pb-4 border-b h-full col-start-4 row-start-1 flex items-center justify-center m-auto w-full text-red-300'> Large</h3>
      <h3 className='max-[500px]:hidden min-[650px]:hidden pb-4 border-b border-r h-full col-start-2 row-start-1 flex items-center justify-center m-auto w-full'> S</h3>
      <h3 className='max-[500px]:hidden min-[650px]:hidden pb-4 border-b border-r h-full col-start-3 row-start-1 flex items-center justify-center m-auto w-full'> M</h3>
      <h3 className='max-[500px]:hidden min-[650px]:hidden pb-4 border-b h-full col-start-4 row-start-1 flex items-center justify-center m-auto w-full'> L</h3>
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-2 row-start-2 flex items-center justify-center m-auto w-full'>$ 9</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-3 row-start-2 flex items-center justify-center m-auto w-full'>$ 13</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b h-full col-start-4 row-start-2 flex items-center justify-center m-auto w-full'>$ 17</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-2 row-start-3 flex items-center justify-center m-auto w-full'>$ 19</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-3 row-start-3 flex items-center justify-center m-auto w-full'>$ 24</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b h-full col-start-4 row-start-3 flex items-center justify-center m-auto w-full'>$ 29</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-2 row-start-4 flex items-center justify-center m-auto w-full'>$ 50</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-3 row-start-4 flex items-center justify-center m-auto w-full'>$ 55</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b h-full col-start-4 row-start-4 flex items-center justify-center m-auto w-full'>$ 59</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-2 row-start-5 flex items-center justify-center m-auto w-full'>$ 100</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b border-r h-full col-start-3 row-start-5 flex items-center justify-center m-auto w-full'>$ 120</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-b h-full col-start-4 row-start-5 flex items-center justify-center m-auto w-full'>$ 140</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-r h-full col-start-2 row-start-6 flex items-center justify-center m-auto w-full'>$ 150</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg border-r h-full col-start-3 row-start-6 flex items-center justify-center m-auto w-full'>$ 200</h4> 
      <h4 className='max-[500px]:hidden max-[649px]:text-lg h-full col-start-4 row-start-6 flex items-center justify-center m-auto w-full'>$ 250</h4> 

    </div>

    
  );
};

export default Price;
