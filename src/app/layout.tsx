import './globals.css'
import './privacy/privacy.css'

import type { Metadata } from 'next'

//Components
import Navbar from '@/components/layout/Navigation/Navigation'
import ScrollBtn from '@/components/layout/ScrollButton/ScrollButton'
import Footer from '@/components/layout/Footer/Footer'

//fonts
import { Inter } from 'next/font/google'
import CookieModal from '@/components/services/Cookie/CookieModal'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'ATBS Abkanttechnik Braunschweig - Blechverarbeitung',
  description: 'Die Lösung gegen lange Durchlaufzeiten und hohe Beschaffungskosten für Ihre Metallteile ist hier. ATBS Braunschweig ist Ihr zuverlässiger Partner für die Fertigung metallischer Komponenten durch Schweißen, Kanten, Lasern. ',
  keywords: ['Blechverarbeitung', 'Metallverarbeitung', 'Stahl', 'Edelstahl', 'Aluminium', 'Schweißen', 'Kanten', 'Lasern'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="de">
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
