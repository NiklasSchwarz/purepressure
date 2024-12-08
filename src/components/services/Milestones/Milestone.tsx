"use client"

import './Milestone.css'
import { useEffect, useState } from 'react';
import { Milestone, Milestone_List } from './MilestoneItem';

//Images
import Loading from '@/app/loading';



const Milestones: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState<number>(1);

  useEffect(() => {
    // Lade die JSON-Datei
    fetch('/milestones.json')
      .then(response => response.json())
      .then((data: Milestone_List) => {
        setMilestones(data.milestones);
        setLoading(0);
        }
      )
      .catch(error => {
        setLoading(-1)
      }
    );
  }, []);

  return (
    <>
      {loading === 1 &&  (<div className='mt-10'><Loading /></div>)}
          {loading === 0 &&  (
            <div className="Timeline_container relative -z-10">
            <h1 className="Timeline_header">Unsere <span className="text-red-300">Geschichte</span> ATBS </h1>
            <div className="Timeline_middle relative">
              {milestones.map((milestone, index) => (
                 <div className={`Timeline_card ${milestone.side == 0 ? "card_right" : "card_left"}`}>
                  <h3>{milestone.title}</h3>
                  <h4>{milestone.year}</h4>
                  <p>{milestone.description}</p>
                </div>
                ),)}
            </div>
          </div>
          )}
          {loading === -1 &&  (
            <div className="Timeline_container relative -z-10">
            <h1 className="Timeline_header">Unsere <span className="text-red-300">Geschichte</span> ATBS </h1>
            <div className="Timeline_middle relative">
              <div className="Timeline_card card_right">
                <h3>Fehler beim Laden</h3>
                <h4>jetzt</h4>
                <p>Es ist ein Fehler aufgetreten, bei dem das Laden des Zeitstrahls nicht mehr funktioniert. Lade die Seite neu oder kontaktiere die ATBS, sofern das Problem zu einem späteren Zeitpunkt noch nicht behoben ist.</p>
              </div>
            </div>
          </div>
          )}
      </>
  );
};

export default Milestones;
