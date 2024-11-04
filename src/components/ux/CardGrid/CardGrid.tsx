import Card from '../Card/Card';
import './CardGrid.css';
  
export default function CardGrid() {
    return (
    <div className="CardGrid"> 
        <Card 
            image='/images/maschines/laser.jpg' 
            button_text='entdecken Sie unsere Laser' 
            headings={["Lasertechnik", "Rohrlasertechnik"]} 
            text='Unsere automatisierten Laseranlagen mit einem Lesitungsvermögen von 4KW bis 6KW, schneiden Ihnen jedes Blechformat bis zu 2 x 4 Meter. Egal ob CO2, Faserlaser oder die neuste Technologie der Profil-Laser, wir haben alles, was Sie brauchen!'>   
        </Card>
        <Card 
            image='/images/maschines/kant.jpg' 
            button_text='mehr zu Blechbearbeitung' 
            headings={["Zerspanung", "Stanztechnik", "Oberflächen"]} 
            text='Unsere automatisierten Laseranlagen mit einem Lesitungsvermögen von 4KW bis 6KW, schneiden Ihnen jedes Blechformat bis zu 2 x 4 Meter. Egal ob CO2, Faserlaser oder die neuste Technologie der Profil-Laser, wir haben alles, was Sie brauchen!'>   
        </Card>
        <Card 
            image='/images/maschines/weld.jpg' 
            button_text='entdecken Sie die Fertigung' 
            headings={["Kanttechnik", "Schweißtechnik", "Baugruppen"]} 
            text='Unsere automatisierten Laseranlagen mit einem Lesitungsvermögen von 4KW bis 6KW, schneiden Ihnen jedes Blechformat bis zu 2 x 4 Meter. Egal ob CO2, Faserlaser oder die neuste Technologie der Profil-Laser, wir haben alles, was Sie brauchen!'>   
        </Card>
    </div>
    );
}