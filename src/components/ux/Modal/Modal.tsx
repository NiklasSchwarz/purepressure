import './Modal.css'

import React from 'react';

// Definiere die Props für die Komponente
interface ContentSectionProps {
  type: number;
  msg: string;
  show: boolean;
  children?: React.ReactNode; // Add this if children are needed
}

// Erstelle die Funktionale Komponente
const Modal: React.FC<ContentSectionProps> = ({ type, msg, show }) => {
    const modalClassMap: { [key: number]: string } = {
        '-1': 'uxModalError',
        '0': 'uxModalNeutral',
        '1': 'uxModalSuccess',
    };

    const modalHeaderMap: { [key: number]: string } = {
        '-1': 'Error',
        '0': 'Information',
        '1': 'Success',
    };

  return (
    <div className={`uxModal ${modalClassMap[type]} ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h3>{modalHeaderMap[type]}</h3>
        <p>{msg}</p>
    </div>
  );
};

export default Modal;