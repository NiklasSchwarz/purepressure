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
        <h1>Die ATBS als <span className='font-semibold text-blue-400'>dein</span> neuer Arbeitgeber.</h1>  
        <a href='/carrer' className='m-4 flex flex-row gap-2 items-center w-fit hover:text-primary transition-colors bottom-0 text-fg'><FaAngleDoubleRight className='text-blue-300 text-xl'/>{button_text}</a>
      </div>
      <div className="relative w-full lg:w-2/3 rounded-[40px] h-100% bg-black">
        <Image src={image}
            alt="Image Card"
            width={1000}
            height={600}
            loading="lazy"
            className="jobs_image"
        /> 
        <div className='jobs_txt'>
          <div className="pt-4 pl-4">
          <p>uiwqbt iqbt qjüj qüjr güiuq rgj qü rg rgnqüwn onqog qowg üoiqnwgo nqwogn r iqgnrgü qi rnogrni qoinrgoq inrgn qowringo qnrgni qoring oqinrgoinq oignoeqin groiqenrgin qorgn oqenrg oqeorg ineqori norir oqin on  noi nqeng roiqenrüng qien nqorig nqe
             uiwqbt iqbt qjüj qüjr güiuq rgj qü rg rgnqüwn onqog qowg üoiqnwgo nqwogn uiwqbt iqbt qjüj qüjr güiuq rgj qü rg rgnqüwn onqog qowg üoiqnwgo nqwogn uiwqbt iqbt qjüj qüjr güiuq rgj qü rg rgnqüwn onqog qowg üoiqnwgo nqwogn </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
