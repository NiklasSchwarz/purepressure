import './LogoStripe.css'
import Image from 'next/image';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  heading: string;
  images: string[];
  children?: React.ReactNode; 

}

// Erstelle die Funktionale Komponente
const LogoStripe: React.FC<ContentSectionProps> = ({ images, heading}) => {
  return (
    <div className='w-full'>
      <h2 className='logo_stripe_heading text-left lg:text-center mb-4 text-dark font-light text-2xl md:text-3xl'>{heading}</h2>
      <div className="logo_stripe_container">
        <div className="logo_stripe">
          {[...images, ...images].map((image, index) => (
          <Image
            key={index}
            src={image}
            width={100}
            height={50}
            alt={`Logo ${index + 1}`}
            className="logo_stripe_img"
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default LogoStripe;
