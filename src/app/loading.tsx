import { FaSpinner } from "react-icons/fa";

// Definiere die Props für die Komponente
interface ContentSectionProps {
  type?: string;
}

// Erstelle die Funktionale Komponente
const Loading: React.FC<ContentSectionProps> = ({ type }) => {
  return <FaSpinner className={`rotation-icon mx-auto text-3xl text-fg ${type != 'text' ? 'my-28' : ''}`}></FaSpinner>
}
export default Loading;

  