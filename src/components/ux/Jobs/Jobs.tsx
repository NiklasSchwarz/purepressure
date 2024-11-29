import Image from 'next/image';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './Jobs.css'

// Definiere die Props für die Komponente
interface ContentSectionProps {
  button_text: string;
  image: string;
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const Contact: React.FC<ContentSectionProps> = ({ button_text, image }) => {
  return (
    <div className="jobs">
      <div className='jobs_heading'>
        <h1>Die ATBS als <br className='hidden xl:block'/><span className='font-semibold text-blue-400'>ihr</span> neuer Arbeitgeber.</h1>  
        <a href='/carrer' className='m-4 flex flex-row gap-2 items-center w-fit hover:text-primary transition-colors bottom-0 text-fg'><FaAngleDoubleRight className='text-blue-300 text-xl'/>{button_text}</a>
      </div>
      <div className="relative w-full lg:w-2/3 rounded-[40px] h-100% bg-black">
        <Image src={image}
            alt="Image Card"
            width={1000}
            height={600}
            loading="lazy"
            className="jobs_image -scale-x-100"
        /> 
        <div className='jobs_txt min-[650px]:block hidden'>
          <div className="pt-4 pl-4">
          <p>ATBS Abkanttechnik Braunschweig bietet Ihnen eine Vielzahl an Einstiegsmöglichkeiten und eine Fülle von beruflichen Profilen, ob Maschienenbediener, Schweißer oder als Aufsichtsperson. Wählen Sie die Vakanz nach Ihren Vorlieben und sehen Sie, welche Stellen wir Ihnen bieten.
            Dabei legen wir besonders auf die Arbeitsathmosphäre wert und stärken diese regelmäißg durch Team-Events oder gemeinsame Essen. Um auch ihre persönlichen Ziele zu erfüllen, helfen wir ihnen gerne mit verschiedensten Weiterbildungsmöglichkeiten.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
