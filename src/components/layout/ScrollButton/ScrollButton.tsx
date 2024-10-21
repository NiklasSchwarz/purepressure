"use client"

import './ScrollButton.css'
import React, {useEffect, useState} from 'react'
import { FaChevronUp } from 'react-icons/fa'

export default function ScrollButton() {
    const [scrollY, setScrollY] = useState({oldScroll: 0, newScroll: 0, scrollDown: true});
    let scrollOld = 0;
    let scrollNew = 0;

    //Check if window renders
    const isBrowser = () => typeof window !== 'undefined';

    const scrollToTop = () => {
        if(!isBrowser()) return
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function logScroll() {
        let positionY = window.pageYOffset;        

        if(scrollY.oldScroll < positionY || positionY <= window.innerHeight/2) {
            setScrollY({oldScroll:scrollY.newScroll, newScroll:positionY, scrollDown: true})

        } else {
            setScrollY({oldScroll:scrollY.newScroll, newScroll:positionY, scrollDown: false})
        }
        
    }
    
    //Scroll Listener
    useEffect(() => {
        if(!isBrowser()) return

        const watchWindow = () => {
            window.addEventListener("scroll", logScroll);
        }

        watchWindow();

        return () => {
            window.removeEventListener("scroll", logScroll);
        } 
    });


    return (
        <div className='layoutBtnContainer'>
            <button id='scrollBtn' className={scrollY.scrollDown ? 'translate-x-28 layoutScrollBtn' : 'layoutScrollBtn'} onClick={scrollToTop}>
                <FaChevronUp/>
            </button>
        </div>
    )
}
