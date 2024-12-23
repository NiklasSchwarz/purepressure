import Card from '../Card/Card';
import './CardGrid.css';
  
export default function CardGrid() {
    return (
    <div className="CardGrid"> 
        <Card 
            image='/images/tire.jpeg' 
            button_text='' 
            headings={["Tire cleaning", "Tire Shyne"]} 
            text='We deep clean your tires and finish with a premium shine, giving them a sleek, like-new look.'>   
        </Card>
        <Card 
            image='/images/snow-foam.jpeg' 
            button_text='' 
            headings={["Snow Foam"]} 
            text='Our snow foam wash gently lifts dirt and grime, leaving your car spotless and protected.'>
        </Card>
        <Card 
            image='/images/wash_and_scrub.jpeg' 
            button_text='' 
            headings={["Exterior full wash/scrub"]} 
            text='Thorough cleaning and scrubbing to remove dirt, grime, and tough stains, leaving your car spotless and refreshed.'>   
        </Card>
        <Card 
            image='/images/bug.jpg' 
            button_text='' 
            headings={["Bug, sap and tar removal"]} 
            text='Expert removal of stubborn bug splatter, tree sap, and tar for a flawless finish.'>   
        </Card>
        <Card 
            image='/images/ceramic_2.jpeg' 
            button_text='' 
            headings={["Ceramic coating"]} 
            text='Durable protection and a high-gloss finish to keep your car looking stunning for years.'>   
        </Card>
        <Card 
            image='/images/vacuum_car.jpg' 
            button_text='' 
            headings={["Full vacuum service"]} 
            text='Comprehensive vacuuming for a clean and dust-free interior.'>   
        </Card>
        <Card 
            image='/images/interior_scrub.jpg' 
            button_text='' 
            headings={["Full interior scrub"]} 
            text='Detailed scrubbing of all surfaces for a spotless and refreshed cabin.'>   
        </Card>
        <Card 
            image='/images/seats_clean.jpg' 
            button_text='' 
            headings={["Deep cleaning of seats"]} 
            text='Thoroughly removes stains, dirt, and odors for fresh, spotless seats.'>   
        </Card>
        <Card 
            image='/images/door_clean.jpg' 
            button_text='' 
            headings={["Cleaning doors & dashboards"]} 
            text='Thorough cleaning to restore shine and remove dirt from doors and dashboards.'>   
        </Card>
        <Card 
            image='/images/hair_removal.jpeg' 
            button_text='' 
            headings={["Hair removal"]} 
            text='Efficient removal of pet hair and fibers for a clean, hair-free interior.'>   
        </Card>
        <Card 
            image='/images/carpet.webp' 
            button_text='' 
            headings={["Carpet shampooing"]} 
            text='Deep cleaning of carpets to remove stains, dirt, and odors for a fresh, revived look.'>   
        </Card>
    </div>
    );
}