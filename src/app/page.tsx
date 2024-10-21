//Images
import Grid from '@/components/ux/Grid/Grid'
import Competences from '@/components/ux/Competence/Competences'
import Rondell from '@/components/ux/Rondell/Rondell'
import Head from '@/components/ux/Head/Head'
import Contact from '@/components/ux/Contact/Contact'
import ImageText from '@/components/ux/ImageText/ImageText'

export default function Home() {
  return ( 
    <>
    <section id='header'>
      <Head 
        heading='ATBS Braunschweig GmbH & Co.KG '
        imageSrc='/images/maschines/laser_2.jpg' 
        imageAlt='HeaderImage'
        text='Die umfassende Lösung gegen lange Durchlaufzeiten und hohe Beschaffungskosten für Ihre Metallteile ist hier. ATBS Braunschweig ist Ihr zuverlässiger Partner für die Fertigung metallischer Komponenten, der lange Lieferzeiten eliminiert und Projektkosten senkt. Mit einem spezialisierten Maschinenpark gewährleisten wir eine effiziente Bearbeitung Ihrer Bauteile auf kurzen Wegen von maximal 150 Metern.'
        subtitle='Die Lösung gegen lange Durchlaufzeiten und hohe Beschaffungskosten für Ihre Metallteile ist hier. ATBS Braunschweig ist Ihr zuverlässiger Partner für die Fertigung metallischer Komponenten. Wir eliminieren lange Lieferzeiten und senken Ihre Projektkosten. Mit unserem spezialisierten Maschinenpark sorgen wir für eine effiziente Bearbeitung Ihrer Bauteile. Dabei halten wir die Wege kurz – maximal 150 Meter.'>
      </Head>
    </section>
    <section id='afterHeader'>
      <Competences 
        headline_one='> 20 Jahre Erfahrung' 
        headline_two='200+ aktive Partner' 
        headline_three='Industrie 4.0' 
        
        text_one='Seit 2002 hat Abkanttechnik Braunschweig über 20 Jahre Erfahrung gesammelt, komplexe Projekte erfolgreich umgesetzt und stetig Expertise aufgebaut. Heute sind wir ein zuverlässiger Partner für Präzision und Qualität in der Metallverarbeitung.'
        text_two='Wir spezialisieren uns auf die Branchen und Produkte unserer Partner. Durch lösungsorientierte Zusammenarbeit – von der Planung bis zum Abschluss – sichern wir gemeinsamen Erfolg und Wachstum.' 
        text_three='Wir setzen die Meilensteine für die Zukunft der Lohnfertigung. Unsere Maschinen im Biege- Schweiß -und Fräsbereich sind mit Robotertechnik ausgestattet. Bis 2027 werden diese intelligent vernetzt und unsere Fertigungsabläufe und Prozesse komplett digitalisiert.'>
      </Competences>
    </section>
    <section>
        <ImageText 
          images={['/images/maschines/DSC07376.jpg', '/images/maschines/DSC07410.jpg', '/images/maschines/laser.jpg', '/images/maschines/laser_2.jpg', '/images/maschines/laser_3.jpg', '/images/maschines/weld.jpg', '/images/maschines/fräse.jpg', '/images/maschines/fräse_2.jpg', '/images/maschines/fräse_3.jpg', '/images/maschines/fräse_4.jpg', '/images/maschines/fräse_5.jpg']}
          heading='Unser Maschinenpark' 
          text='Unser hochmoderner Maschinenpark umfasst automatisierte CNC-Fräsmaschinen, Laserschneidanlagen mit Selbstbeladefunktion, Schweißroboter und eine automatisierte Kantmaschine. Mit dieser Ausstattung fertigen wir die Großserien unserer Kunden und produzieren Bauteile in hohen Stückzahlen – stets mit gleichbleibender Qualität, auch bei hochkomplexen Teilen.'>
        </ImageText> 
    </section>
    <section>
      <div className='flex flex-col text-center justify-center'>
        <h2>Leistungsportfolio</h2>
        <Grid/>
      </div>
    </section>
    <section className='lg:pt-16 Rondell'>
      <Rondell/>
    </section>
    <section id="last">
      <Contact heading='Kontakt' text='Sie haben Interesse an einer Zusammenarbeit mit uns oder vielleicht noch offene Fragen? | Dann zögern Sie nicht und treten mit uns in den Kontakt. Wir freuen uns drauf!'/>
    </section>
    </>
  )
}