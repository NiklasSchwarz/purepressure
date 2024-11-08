//Client Side Rendering
"use client"

import './Navigation.css'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import NavigationLink from './NavigationLink'



export default function Navbar() {
    const [nav, setNav] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    
    
    //Check if window renders
    const isBrowser = () => typeof window !== 'undefined';
    const pathname = usePathname();

    // TODO: dynamisch zur Weberweiterung 
    const links = [
        { id:"1", text: "Übersicht", href: "/"},
        { id:"2", text: "Leistungen", href: "/services"},
        { id:"3", text: "Kontakt", href: "/contact"},
        { id:"4", text: "Karriere", href: "/carrer"}
    ]
    
    useEffect(() => {
        if (!isBrowser()) return;
        
        // Update the active index based on the current path
        const currentIndex = links.findIndex(link => link.href === pathname);
        setActiveIdx(currentIndex);
        }, [pathname, links]); // Re-run the effect when pathname or links change

    useEffect(() => {
        if(!isBrowser()) return;
        toggleScroll();

        function toggleScroll() {
            if (nav) {
                window.onscroll = () => {
                    setNav(false);
                }
            }
        }
    }, [nav]);

    return (
        <header className='layoutNavigationHeader'>
            <Link className='layoutNavigationLogo' href="/">
                <img src="ATBS_logo_clean.png" alt="ATBS_LOGO" className='layoutNavigationLogoImg'/>
            </Link>
            <nav className={nav ? 'layoutNavigation' : 'layoutNavigation layoutNavigationHidden'}>
                <ul>
                    {
                        links.map((item, index) => (
                            <Link key={item.id} href={item.href}>
                                <div className={`${activeIdx != 0 ? "text-fg" : "text-fg"}`} onClick={() => {setNav(false)}}>
                                    <NavigationLink text={item.text} active={activeIdx === index} /> 
                                </div> 
                            </Link>
                        ))}
                </ul>
            </nav>
            <button className={`layoutNavigationButton border-2 ${activeIdx != 0 ? "border-fg" : "border-fg"}`} aria-expanded={nav? "true" : "false"} onClick={() => setNav(!nav)}>
                <svg stroke={`${activeIdx != 0 ? "rgba(var(--color-fg))" : "rgba(var(--color-fg))"}`} fill="none" className="hamburger" viewBox="-10 -10 120 120" width="40">
                <path className="line" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
                </path>
                </svg>
            </button>
        </header>
    )
}
