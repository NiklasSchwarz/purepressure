import ContactForm from '@/components/forms/Contact/ContactForm'
import TrashClean from '@/components/ux/TrashClean/TrashClean'
import Price from '@/components/ux/Prices/Prices'
import About from '@/components/ux/About/About'
import CardGrid from '@/components/ux/CardGrid/CardGrid'
import TextImage from '@/components/ux/TextImage/TextImage'
import Head from '@/components/ux/Head/Head'

export default function Home() {
  return ( 
    <><section>
      <Head imageSrc={'/images/HEAD.jpeg'} imageAlt={'Head Img'} heading={'Pure Pressure Hawaii'} subtitle={'Keeping Hawaii clean'} text={'Professional cleaning service that will bring you immaculate results'}></Head>
    </section>
    <section className='flex min-[800px]:flex-row justify-between min-[800px]:gap-0 gap-8'><h1 className='w-full min-[800px]:w-[25%]'>What are <span className='text-blue-300'>we doing?</span></h1><p className='w-full min-[800px]:w-2/3 text-dark text-lg'>At Pure Pressure Hawaii, we specialize in premium car detailing services tailored to meet your needs. Whether you need a quick refresh or a deep clean, our expert team delivers unparalleled results. Located in Kaneohe, we’re your go-to destination for keeping your car looking and feeling new.</p></section>
      <section>
        <CardGrid></CardGrid>
      </section>
      <section><TextImage imageSrc={'/images/detailing.jpeg'} imageAlt={'Detailing Img'} heading={'Our Car Detailing Service'} text={'Experience the ultimate transformation for your vehicle with our top-tier mobile auto detailing service. Our meticulous team of experts is dedicated to enhancing the beauty, comfort, and overall condition of your car. We go beyond the surface to provide a comprehensive interior and exterior rejuvenation, including thorough cleaning, waxing, and meticulous attention to detail.'}></TextImage></section> 
      <section id="Prices">
        <h1 className='mb-20'>Prices</h1>
        <Price />
      </section>
      <section>
        <p className='text-2xl text-center w-[80%] min-w-[300px] leading-relaxed h-auto'>
          “At Pure Pressure Hawaii, we’re passionate about cars and committed to excellence. Our mission is to provide top-quality detailing services while ensuring every client drives away satisfied.”
        </p>
      </section>
      <section id="trash-can">
        <TrashClean></TrashClean>
      </section>
      <section>
        <About button_text='Book an appointment' image='/images/Steering_wheel.jpeg'></About>
      </section>
      <section id="last">
        <ContactForm></ContactForm>
      </section>
    </>
  )
}