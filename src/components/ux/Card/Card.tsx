import './Card.css'
import Image from "next/image";
import { FaAngleDoubleRight } from 'react-icons/fa';

interface ContentSectionProps {
    headings: string[];
    button_text: string;
    image: string;
    text: string;
    children?: React.ReactNode; // Add this if children are needed
  }
  
// Erstelle die Funktionale Komponente
const Card: React.FC<ContentSectionProps> = ({ headings, text, image, button_text }) => {
    return(
        <div className="w-[90%] bg-bg rounded-[40px] min-w-[300px] relative card_container">
            <div className="relative overflow-hidden w-full">
                <Image src={image}
                    alt="Image Card"
                    width={600}
                    height={600}
                    loading="lazy"
                    className="rounded-[40px] h-80 w-full object-cover object-top"
                />
                <div className="card_card_heading">
                    {headings.map((heading, index) => (
                        index != headings.length-1 ? (
                            <h3 key={index}>{heading},</h3>
                        ) : (
                            <h3 key={index}>{heading}</h3>
                        )
                    ))}
                </div>
            </div>
            <p className="m-4">{text}</p>
            <a href='/services/#one' className='m-4 flex flex-row gap-2 items-center w-fit hover:text-primary transition-colors bottom-0 text-fg'><FaAngleDoubleRight className='text-primary'/>{button_text}</a>
        </div>
    );
}

export default Card;