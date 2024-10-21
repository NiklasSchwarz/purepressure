import './Grid.css';
import React from 'react';

const Grid = () => {
  return (
    <div className="uxGridContainer">
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/fräsen_1.jpg" alt="Fräsmaschine" />
          <h4>Zerspanung</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/lasern_1.jpg" alt="Rohrlaser" />
          <h4>Lasertechnik</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/kanten_2.jpg" alt="Kantmaschine" />
          <h4>Kanttechnik</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/schweißen_1.jpg" alt="Schweisroboter" />
          <h4>Schweisstechnik</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/maschines/oberfläche2.jpg" alt="Oberflaeche" />
          <h4>Oberflächenbehandlung</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/lasern_3.jpg" alt="Brennschneiden" />
          <h4>Rohrlasertechnik</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/baugruppe.jpg" alt="Baugruppenfertigung" />
          <h4>Baugruppenfertigung</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/cad_2.jpg" alt="Konstruktion" />
          <h4>Konstruktion</h4>
        </div>
      </a>
      <a href="/contact">
        <div className="uxGridItem">
          <img src="/images/actions/oberfläche.jpg" alt="Tragwerksplanung" />
          <h4>Stanztechnik</h4>
        </div>
      </a>
    </div>
  );
};

export default Grid;