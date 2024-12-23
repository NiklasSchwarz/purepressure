import React from 'react'
import Link from 'next/link'

import { FaHome, FaPhone, FaEnvelope, FaRegCopyright, FaInstagram, FaFacebook  } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer  className='w-full p-10 bg-bg font-light text-fg break-words flex flex-col items-center sm:block border-t-[1px] border-fg border-opacity-30'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center my-5 w-full'>
        <img src="logo.png" alt="LOGO" className='max-h-[200px] pb-10'/>
        <div className='flex flex-col gap-2 sm:max-w-xs text-center sm:text-left'>
          <p className='text-xl font-bold'>Our Locations</p>
          <p className='text-lg xl:text-xl font-bold  mb-4'>Pure Pressure Hawaii</p>
              <div className='flex-row flex items-center gap-4 justify-normal mb-2 mx-auto sm:mx-0'>
                <FaPhone className='text-fg'/> 
                <a href='callto:+18082192128' className='text-lg xl:text-xl'><p className='text-lg xl:text-xl cursor-pointer'>+1 (808) 219-2128</p>   </a>    
              </div>
              <div className='flex-row flex items-center gap-4 justify-normal mb-2 mx-auto sm:mx-0'>
                <FaEnvelope className='text-fg'/> 
                <a href='mailto:Purepressurehawaii@gmail.com' className='text-lg xl:text-xl'><p className='text-lg xl:text-xl cursor-pointer'>Purepressure&shy;hawaii&shy;@gmail.com</p>   </a>    
              </div>
              <div className='flex-row flex items-center gap-4 justify-normal mx-auto sm:mx-0'>  
                <FaHome className='text-fg'/>         
                <p className='text-lg xl:text-xl text-justify'>  
                  47-172 Waiohia Place <br />
                  Kaneohe, Hawaii 96744<br /> <br />
                </p>  
              </div>
        </div>
        <div className='flex flex-col gap-2  sm:max-w-xs'>
          <p className='text-xl font-bold text-center sm:text-left'>Contact</p>
          <div className='flex-col flex text-center sm:text-left items-center gap-4 text-lg'>
            <p>
              Do you have any questions or aren't sure if we are the right fit? <br/><br/>
              Get in touch!
            </p>
            <div className='flex flex-row justify-center sm:justify-start items-center gap-4 w-full pb-10'>
              <a href='https://www.instagram.com/purepressurehawaii/' className='text-2xl'><FaInstagram className='text-fg'/> </a>    
              <a href='https://www.instagram.com/purepressurehawaii/' className='text-2xl'><FaFacebook className='text-fg'/> </a>    
              <a href='mailto:Purepressurehawaii@gmail.com' className='text-2xl'><FaEnvelope className='text-fg'/> </a>    
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-1 sm:flex-row items-center sm:justify-around'>
        <div className="flex gap-4 text-sm">
            <Link className='layoutFooterLink' href="/legal">Terms of Use</Link>
            <Link className='layoutFooterLink' href="/legal">Legal</Link>
            <Link className='layoutFooterLink' href="/privacy">Privacy</Link>
        </div>
        <p className='text-sm flex items-center gap-1'><FaRegCopyright/>Pure Pressure Hawaii, Inc.</p>
      </div>
    </footer>
  )
}
