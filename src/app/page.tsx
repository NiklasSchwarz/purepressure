import ContactForm from '@/components/forms/Contact/ContactForm'
import TrashClean from '@/components/ux/TrashClean/TrashClean'
import Price from '@/components/ux/Prices/Prices'
import About from '@/components/ux/About/About'

export default function Home() {
  return ( 
    <>
      <section id="rondell">
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