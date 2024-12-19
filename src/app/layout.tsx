import './globals.css'
import type { Metadata } from 'next'

import ReactGA from 'react-ga';
const TRACKING_ID = "G-JNMJVK8C0Q"; 
ReactGA.initialize(TRACKING_ID);

//Components
import Navbar from '@/components/layout/Navigation/Navigation'
import ScrollBtn from '@/components/layout/ScrollButton/ScrollButton'
import Footer from '@/components/layout/Footer/Footer'

//fonts
import { Inter } from 'next/font/google'
import CookieModal from '@/components/services/Cookie/CookieModal'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Pure Pressure Hawaii - Car Detailing and Pressure Washing Service',
  description: 'Professional cleaning service that will bring you immaculate results, we specialize in premium car detailing services whether you need a quick refresh or a deep clean, our expert team delivers unparalleled results. Located in Kaneohe, we’re your go-to destination for keeping your car looking and feeling new in Hawaii.',
  keywords: ['Pressure', 'Washing', 'Car', 'Detailing', 'Hawaii', 'Cheap', 'Coating', 'Ceramic', 'Cleaning'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <Navbar />
          {children}
          <CookieModal/>
          <ScrollBtn/>
        </div>
        <Footer />
      </body>
    </html>
  )
}
