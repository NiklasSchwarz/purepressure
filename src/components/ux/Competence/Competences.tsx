import './Competences.css'

// Icon Imports
import { FaLightbulb } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaMicrochip } from 'react-icons/fa';

// Definiere die Props für die Komponente
interface CompetencesProps {
    headline_one: string;
    text_one: string;
    headline_two: string;
    text_two: string;    
    headline_three: string;
    text_three: string;
    children?: React.ReactNode; // Add this if children are needed

  }
  
  // Erstelle die Funktionale Komponente
  const Competences: React.FC<CompetencesProps> = ({ 
        headline_one,
        text_one,
        headline_two,
        text_two,    
        headline_three,
        text_three
    }) => {

    return (
      <div className="uxCompetencesContainer">
        <div className="uxCompetencesContent">
          <FaLightbulb className='uxCompetencesIcon'/>
          <h4>{headline_one}</h4>
          <p>{text_one}</p>
        </div>
        <div className="uxCompetencesContent">
          <FaHandshake className='uxCompetencesIcon'/>
          <h4>{headline_two}</h4>
          <p>{text_two}</p>
        </div>
        <div className="uxCompetencesContent">
          <FaMicrochip className='uxCompetencesIcon'/>
          <h4>{headline_three}</h4>
          <p>{text_three}</p>
        </div>
      </div>
    );
  };
  
  export default Competences;