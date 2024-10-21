import Carrer from '@/components/services/Carrer/Carrer'
import '@/components/services/Carrer/Carrer.css'

const CarrerPage = () => {
  return (
    <main className={`jobContainer pb-8 flex flex-row justify-start items-center gap-10 pt-8`}> 
        <h2 className="text-2xl sm:text-4xl">Stellenangebote</h2>
        <p className='text-center'>ATBS Abkanttechnik Braunschweig bietet Ihnen eine Vielzahl an Einstiegsmöglichkeiten und eine Fülle von beruflichen Profilen. Wählen Sie die Vakanz nach Ihren Vorlieben und sehen Sie, welche Stellen wir Ihnen bieten.</p>
        <Carrer />
    </main>
  );
};

export default CarrerPage;
