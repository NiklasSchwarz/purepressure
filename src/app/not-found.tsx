import Link from 'next/link'
import { FaExclamationCircle } from 'react-icons/fa'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center h-96 text-center gap-8 mt-32 w-4/5 mx-auto relative'>
      <FaExclamationCircle className='absolute -top-16 -left-12 -z-10 text-fg opacity-5 w-2/3 h-2/3'/>
      <h2 className='whitespace-normal'>Seite nicht gefunden</h2>
      <p>Die angefrage Ressource existiert nicht. Bitte veruchen Sie es über einen anderen Weg.</p>
      <Link href="/" className='px-8 py-4 bg-primary hover:bg-primary2 transition-all duration-300 hover:scale-110 text-bg border-2 rounded-md mx-auto w-fit mb-32'>Startseite</Link>
    </div>
  )
}