import Image from "next/image";
import './company.css'

const Company = () => {

  return (
    <>
      <section className="flex flex-col">
          <div className="CompanyContainer">
          <div className="CompanyText">
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Historie,</h1>
            <h1 className="text-red-300 text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Leistungen<span className="text-fg">,</span></h1>
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Maschinen&shy;park</h1>
          </div>
          <Image src={'/images/maschines/laser_2.jpg'} alt={'Company Head Image'} width={1200} height={1000} className='CompanyImage'></Image>
        </div>
        <h4 className='font-normal text-xl lg:text-2xl pt-20 px-8 leading-normal lg:leading-normal'>Als erfahrener Blechbearbeiter legen wir großen Wert auf Qualität und Kundenzufriedenheit. Unser Ziel ist es, Ihre Anforderungen präzise und termingerecht umzusetzen.
          Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie ein individuelles Angebot einholen? Zögern Sie nicht, uns zu kontaktieren. Füllen Sie einfach das Formular aus oder kontaktieren Sie uns direkt über <b>vertrieb@atbs.de</b>, und wir melden uns schnellstmöglich bei Ihnen.
        </h4>
      </section>
      <section>
        <div className="Timeline_container relative -z-10">
          <h1 className="Timeline_header">Unsere <span className="text-red-300">Geschichte</span> ATBS </h1>
          <div className="Timeline_middle relative">
            <div className="Timeline_card card_right">
              <h3>Firmengründung</h3>
              <h4>2002</h4>
              <p>Gründung des Unternehmens ATBS am Standort Braunschweig-Broitzem, Wiesenweg.</p>
            </div>
            <div className="Timeline_card card_left">
              <h3>Niederlassung Bremerhaven</h3>
              <h4>2005</h4>
              <p>Das Unternehmen ist beschäftigt mittlerweile mehr als 20 Mitarbeiter und eröffnet eine Niederlassung in Bremerhaven.</p>
            </div>
            <div className="Timeline_card card_left">
              <h3>Umzug in die Marienberger Straße</h3>
              <h4>2005</h4>
              <p>ATBS ist aus dem ersten Standort herausgewachsen und zieht nun in die Marienberger Straße.</p>
            </div>
            <div className="Timeline_card card_right">
              <h3>Umzug in die Industriestraße</h3>
              <h4>2008</h4>
              <p>Der Anstieg der Mitarbeiter auf über 40 Arbeitskräfte und die Maschinenanzahlen haben zur Folge, dass die Produktionsfläche auf 4000qm ausgeweitet wird.</p>
            </div>
            <div className="Timeline_card card_left">
              <h3>Niederlassung Lengede</h3>
              <h4>2009</h4>
              <p>Die ATBS wächst stetig. Daher musste ein weiterer Produktionsstandort her - Lengede.</p>
            </div>
            <div className="Timeline_card card_right">
              <h3>Standort&shy;erweiterung Bremerhaven</h3>
              <h4>2010</h4>
              <p>Die Produktion in der Niederlassung Bremerhaven benötigt mehr Platz. Der Standort zieht in eine neue Fertigungshalle.</p>
            </div>
            <div className="Timeline_card card_left">
              <h3>Mehr als 60 Mitarbeiter</h3>
              <h4>2012</h4>
              <p>Die ATBS beschäftigt inzwischen mehr als 60 Mitarbeiter.</p>
            </div>
            <div className="Timeline_card card_right">
              <h3>Weitere Standort&shy;eröffnung</h3>
              <h4>2018</h4>
              <p>Auf dem Produktionsgelände der ALSTOM eröffnet die ATBS einen weiteren Standort inkl. neuer Flachbettlaser und Kantmaschinen.</p>
            </div>
            <div className="Timeline_card card_left">
              <h3>Großinvestitionen</h3>
              <h4>2019 - jetzt</h4>
              <p>Die ATBS investiert akribisisch in die Erweiterung der Produktionsanalage. Es werden neue Kant-, Laser- sowie Dreh- und Fräsmaschinen angeschafft.</p>
            </div>
            <div className="Timeline_card card_right">
              <h3>Automatisierung</h3>
              <h4>2023</h4>
              <p>Die ATBS entdeckt das Potenzial automatischer Produktion und investiert in die Anschaffung von mehreren automatisierten Maschinen im Stanz/ Kant- Schweiß und Zerspanungsbereich.</p>
            </div>
            <div className="Timeline_card card_right">
              <h3>Mehr als 85 Mitarbeiter</h3>
              <h4>2023</h4>
              <p>Das Unternehmen beschäftigt nun mehr als 85 Mitarbeiter, verteilt auf die verschiedenen Standorte.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Company;