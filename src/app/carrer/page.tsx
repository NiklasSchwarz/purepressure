import Carrer from '@/components/services/Carrer/Carrer'
import '@/components/services/Carrer/Carrer.css'
import './carrer.css'
import Image from 'next/image';

const CarrerPage = () => {
  return (
    <section className='flex flex-col'> 
      <div className="carrerContainer">
        <div className="carrerText">
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Stellenangebote</h1>
        </div>
        <Image src={'/images/carrer_head.jpg'} alt={'Carrer Head Image'} width={1200} height={1000} className='carrerImage'></Image>
      </div>
          <h4 className='font-normal text-2xl lg:text-3xl py-16 px-8 leading-normal lg:leading-normal'>ATBS Abkanttechnik Braunschweig bietet Ihnen eine Vielzahl an Einstiegsmöglichkeiten und eine Fülle von beruflichen Profilen. Wählen Sie die Vakanz nach Ihren Vorlieben und sehen Sie, welche Stellen wir Ihnen bieten.</h4>
        <Carrer />
    </section>
  );
};

export default CarrerPage;
