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
    <section className='overflow-visible'>
      <Head 
        heading='Ihre Ideen, perfektioniert in Metall.'
        imageSrc='/images/actions/lasern_3.jpg' 
        imageAlt='HeaderImage'
        text='Mit uns als ihren Partner haben Sie keine langen Durchlaufzeiten oder hohe Beschaffungskosten.'
        subtitle='Kennen Sie lange Durchlaufzeiten oder hohe Beschaffungskosten? Die ATBS nicht.'>
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