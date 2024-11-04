//Images
import Grid from '@/components/ux/Grid/Grid'
import Competences from '@/components/ux/Competences/Competences'
import Rondell from '@/components/ux/Rondell/Rondell'
import Head from '@/components/ux/Head/Head'
import Contact from '@/components/ux/Contact/Contact'
import SliderTxt from '@/components/ux/Slider/Slider'
import CardGrid from '@/components/ux/CardGrid/CardGrid'
import LogoStripe from '@/components/ux/LogoStripe/LogoStripe'
import Jobs from '@/components/ux/Jobs/Jobs'

export default function Home() {
  return ( 
    <>
    <section>
      <Head 
        heading='ATBS Braunschweig GmbH & Co.KG '
        imageSrc='/images/maschines/laser_2.jpg' 
        imageAlt='HeaderImage'
        text='Die umfassende Lösung gegen lange Durchlaufzeiten und hohe Beschaffungskosten für Ihre Metallteile ist hier. ATBS Braunschweig ist Ihr zuverlässiger Partner für die Fertigung metallischer Komponenten, der lange Lieferzeiten eliminiert und Projektkosten senkt. Mit einem spezialisierten Maschinenpark gewährleisten wir eine effiziente Bearbeitung Ihrer Bauteile auf kurzen Wegen von maximal 150 Metern.'
        subtitle='Die Lösung gegen lange Durchlaufzeiten und hohe Beschaffungskosten für Ihre Metallteile ist hier. ATBS Braunschweig ist Ihr zuverlässiger Partner für die Fertigung metallischer Komponenten. Wir eliminieren lange Lieferzeiten und senken Ihre Projektkosten. Mit unserem spezialisierten Maschinenpark sorgen wir für eine effiziente Bearbeitung Ihrer Bauteile. Dabei halten wir die Wege kurz – maximal 150 Meter.'>
      </Head>
    </section>
    <section id="services">
      <CardGrid/>    
    </section>
    <section>
      <Competences images={['/images/maschines/DSC07376.jpg', '/images/maschines/DSC07410.jpg', '/images/maschines/laser.jpg', '/images/maschines/laser_2.jpg', '/images/maschines/laser_3.jpg', '/images/maschines/weld.jpg', '/images/maschines/fräse.jpg', '/images/maschines/fräse_2.jpg', '/images/maschines/fräse_3.jpg', '/images/maschines/fräse_4.jpg', '/images/maschines/fräse_5.jpg']}      ></Competences>
    </section>
    <section>
        <SliderTxt 
          images={['/images/maschines/DSC07376.jpg', '/images/maschines/DSC07410.jpg', '/images/maschines/laser.jpg', '/images/maschines/laser_2.jpg', '/images/maschines/laser_3.jpg', '/images/maschines/weld.jpg', '/images/maschines/fräse.jpg', '/images/maschines/fräse_2.jpg', '/images/maschines/fräse_3.jpg', '/images/maschines/fräse_4.jpg', '/images/maschines/fräse_5.jpg']}
        /> 
    </section>
    <section id="rondell">
      <Rondell/>
    </section>
    <section id="jobs">
      <Jobs 
        image='/images/jobs.jpg' 
        button_text='zum neuen Job'
      />
    </section>
    <section id="last">
      <Contact 
        image='/images/maschines/oberfläche2.jpg' 
        heading='Kontaktieren Sie uns, um Ihr Angebot zu sichern.' 
        text='Sie haben Interesse an einer Zusammenarbeit mit uns oder vielleicht noch offene Fragen? Dann zögern Sie nicht und treten mit uns in den Kontakt. Wir freuen uns drauf!'
      />
    </section>
    </>
  )
}