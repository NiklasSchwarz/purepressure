import React from 'react'
import Link from 'next/link'

//Icons
import { FaEnvelope, FaRegCopyright } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaXingSquare, FaFacebook, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer  className='w-100 p-10 bg-fg bg-opacity-20 font-light text-fg break-words flex flex-col items-center sm:block'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center m-5'>
        <img src="ATBS_logo_clean.png" alt="ATBS_LOGO" className='logo_clean pb-10'/>
        <div className='flex flex-col gap-2 w-5/6 max-w-xs text-center sm:text-left'>
          <p className='text-lg font-bold'>Unsere Standorte</p>
          <p className='text-sm font-bold'>Braunschweig</p>
          <div className='flex-row flex items-center gap-4 text-center justify-center sm:justify-normal  sm:text-left'>
            <FaPhone className='text-fg'/> 
            <a href='callto:05307204120' className='text-sm'><p className='text-sm'>+49(0)5307 / 204120 </p>  </a>    
          </div>
          <div className='flex-row flex items-center gap-4 justify-center sm:justify-normal'>
            <FaHome className='text-fg'/>         
            <p className='text-sm text-justify'>  
              Industriestraße 7<br />
              38110 Braunschweig<br /> <br />
            </p>  
          </div>
          <p className='text-sm font-bold '>Lengede</p>
          <div className='flex-row flex items-center gap-4 justify-center sm:justify-normal'>
            <FaPhone className='text-fg'/> 
            <a href='callto:05344261236' className='text-sm'><p className='text-sm'>+49(0)5344 / 261-236</p>   </a>    
          </div>
          <div className='flex-row flex items-center gap-4 justify-center sm:justify-normal'>  
            <FaHome className='text-fg'/>         
            <p className='text-sm text-justify'>  
              Lise-Meitner-Straße 7B<br />
              38268 Lengede<br /> <br />
            </p>  
          </div>
        </div>
        <div className='flex flex-col gap-2 w-5/6 max-w-xs'>
          <p className='text-lg font-bold text-center sm:text-left'>Kontakt</p>
          <div className='flex-col flex text-center sm:text-left items-center gap-4 text-lg'>
            <p>
              Sie haben noch Fragen oder sind sich unsicher, ob wir die richtigen sind? <br/>
              Treten Sie mit uns in Kontakt!
            </p>
            <div className='flex flex-row justify-center sm:justify-start items-center gap-4 w-full pb-10'>
              <a href='https://www.xing.com/pages/atbsabkanttechnik' className='text-2xl'><FaXingSquare className='text-fg'/> </a>    
              <a href='https://www.facebook.com/people/Abkanttechnik-Braunschweig-ATBS/100063503693789/' className='text-2xl'><FaFacebook className='text-fg'/> </a>    
              <a href='https://de.linkedin.com/company/atbs-abkanttechnik-braunschweig?trk=public_profile_topcard-current-company' className='text-2xl'><FaLinkedinIn className='text-fg'/> </a>    
              <a href='mailto:info@atbs.de' className='text-2xl'><FaEnvelope className='text-fg'/> </a>    
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-1 sm:flex-row items-center sm:justify-around'>
        <div className="flex gap-4 text-sm">
            <Link className='layoutFooterLink' href="/imprint">Impressum</Link>
            <Link className='layoutFooterLink' href="/privacy">Datenschutz</Link>
        </div>
        <p className='text-sm flex items-center gap-1'><FaRegCopyright/>ATBS, Inc.</p>
      </div>
    </footer>
  )
}
