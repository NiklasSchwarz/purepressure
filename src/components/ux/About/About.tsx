import Image from 'next/image';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './About.css'

// Definiere die Props für die Komponente
interface ContentSectionProps {
  button_text: string;
  image: string;
  children?: React.ReactNode; // Add this if children are needed

}

// Erstelle die Funktionale Komponente
const About: React.FC<ContentSectionProps> = ({ button_text, image }) => {
  return (
    <div className="About max-[649px]:bg-gray-200 max-[649px]:p-8 max-[649px]:rounded-[40px]">
      <div className='About_heading'>
        <h1>About the <br className='hidden xl:block'/><span className='font-semibold text-blue-400'>Team</span></h1>  
        <a href='/booking' className='m-4 flex flex-row gap-2 items-center w-fit hover:text-primary transition-colors bottom-0 text-fg'><FaAngleDoubleRight className='text-blue-300 text-xl'/>{button_text}</a>
      </div>
      <div className="relative w-full lg:w-2/3 rounded-[40px] h-100% ">
        <Image src={image}
            alt="Image Card"
            width={1000}
            height={600}
            loading="lazy"
            className="About_image -scale-x-100 max-[649px]:hidden"
        /> 
        <div className='About_txt'>
          <div className="pt-4 pl-4">
            <p>
              My name is Marcus, and I founded Pure Pressure Hawaii. I have been a car enthusiast ever since I was young and have always believed that cars should be showcased at their finest. So, it became my passion to ensure that they always look their best. I am originally from England and made the move to the States in 2020 on a soccer scholarship. I studied for 4 years to get my bachelor's degree and fell in love with a Hawaiian girl who convinced me to make the move here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
