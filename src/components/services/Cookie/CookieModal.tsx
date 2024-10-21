'use client'

import Modal from '@/components/ux/Modal/Modal';
import './Cookies.css';

import React, { useEffect, useState } from 'react';
import { FaTimes, FaCookieBite, FaChevronDown} from 'react-icons/fa'

const CookieModal: React.FC = () => {
  const [hidden, triggerHidden] = useState<boolean>(true);
  const [extended, setExtended] = useState<boolean[]>([false, false, false]);
  const [marketingCookie, setMarketing] = useState<boolean>(false);
  const [funtionalCookie, setFunctional] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    event?.preventDefault();
    const getCookieConsent = async () => {
        const response = await fetch("/api/cookies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
        if(response.ok) {
            const data = await response.json();
            setMarketing(data.marketing);
            setFunctional(data.functional);
            triggerHidden(true);
        } else {
            setFunctional(true);
            setMarketing(true);
            triggerHidden(false);
        }
      }
      getCookieConsent();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  useEffect(() => {
    // If success changes and is true, set timeout to reset it after 2 seconds
    if (error || success) {
      const timer = setTimeout(() => {
        setError(false); // Reset to null after 2 seconds
        setSuccess(false);
      }, 2000);

      // Cleanup the timer when component unmounts or `error` changes
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const toggleExtended = (index:number) => {
    const newExtended = [...extended];
    newExtended[index] = !extended[index];
    setExtended(newExtended);
  }
    
  const updateCookieSettings = async (type: number) => {
    var newFunctional = funtionalCookie;
    var newMarketing = marketingCookie;

    if(type == 1) {
        newFunctional = true;
        newMarketing = true;
        setFunctional(true);
        setMarketing(true);
    }

    if(type == 2) {
        newFunctional = false;
        newMarketing = false;
        setFunctional(false);
        setMarketing(false);       
    }

    try {
        const response = await fetch("/api/cookies", {
          method: "POST",
          body: JSON.stringify({
            functional: newFunctional,
            marketing: newMarketing
        }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
            triggerHidden(true);
            setSuccess(true);
        }
      } catch (error) {
        triggerHidden(true);
        setError(true);
      }
  }

  useEffect(() => {
    hidden ? document.body.classList.remove('no-doc-scroll') : document.body.classList.add('no-doc-scroll'); 
  }, [hidden]);

  return (
    <>
        <button className={`text-4xl bg-neutral text-dark rounded-full shadow-lg w-16 fixed bottom-4 left-4 h-16 hover:bg-primary duration-200 transition-all ease-in-out ${!hidden ? "pointer-events-none" : null}`} 
                onClick={() => triggerHidden(!hidden)}>
            <FaCookieBite className='m-auto'/>
        </button>
        <div className={`uxCookieModal ${hidden ? "hidden" : null}`}>
        <div className='uxCookieModalContent text-fg flex flex-col justify-between'>
            <div className="uxCookieModalWrap">
                <div className="flex flex-row justify-between"><h3>Privatspähre Einstellungen</h3><button onClick={() => triggerHidden(true)}><FaTimes className='text-2xl'/></button></div>
                <p>Wenn Sie zustimmen, nutzen wir Dienste von Drittanbietern, die Informationen auf dem Endgerät eines Seitenbesuchers speichern oder dort abrufen. Wir verarbeiten die Informationen dann weiter. All dies hilft uns, unsere Website optimal zu gestalten und unsere Besucher besser zu verstehen. Sie können Ihre Einwilligung mit Wirkung für die Zukunft widerrufen, z.B. auf der linken Seite auf dem Fingerabdruck.</p>
                <div className="uxCookieModalTextLink"><a href="/imprint" onClick={() => triggerHidden(!hidden)}>Impressum</a><a href="/privacy" onClick={() => triggerHidden(!hidden)}>Datenschutz</a></div>
                <div>
                    <h4 className='mb-4'>Cookies</h4>
                    <ul>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                    Essentiell 
                                    <p className='text-sm text-fg opacity-60'>Diese Technologien sind erforderlich, um die Kernfunktionalität dieser Seite zu gewährleisten.</p>
                                </div>
                                <div className='functionContainer'>
                                    <label className="toggle pointer-events-none">
                                        <input checked={true} type="checkbox" id="toggleSwitch" readOnly/>
                                        <div className='toggleContainer'></div>
                                    </label>
                                    <button onClick={()=>toggleExtended(0)} className={`uxCookieModalChev ${extended[0] ? "active" : null}`}><FaChevronDown className='text-fg'/></button>
                                </div>
                            </div>
                            <p className={`cookieDetails ${extended[0] ? "show" : null}`}>
                                &bull; Google ReCaptcha - verhindert das Nutzen der Seite für Bots <br/>
                                &bull; Session Cookies  - speichern temporäre Informationen während der Sitzung eines Benutzers<br/>
                                &bull; Sicherheits Cookies  - Diese Cookies sind notwendig, um die Sicherheit zu gewährleisten<br/>
                                &bull; Cookie-Zustimmung  - Speichert die Entscheidung des Nutzers bezüglich der Zustimmung zu nicht-essentiellen Cookies.<br/>
                            </p>
                        </li>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                    Funktional 
                                    <p className='text-sm text-fg opacity-60'>Der Gebrauch dieser Technologien ermöglicht es uns, die Nutzung der Seite zu analysieren, um die Leistung zu messen und zu verbessern.</p>
                                </div>
                                <div className='functionContainer'>
                                    <label className="toggle">
                                        <input type="checkbox" id="toggleSwitch" checked={funtionalCookie} onChange={()=>{setFunctional(!funtionalCookie)}}/>
                                        <div className='toggleContainer'></div> 
                                    </label>
                                    <button onClick={()=>toggleExtended(1)}  className={`uxCookieModalChev ${extended[1] ? "active" : null}`}><FaChevronDown className='text-fg'/></button>
                                </div>
                            </div>
                            <p className={`cookieDetails ${extended[1] ? "show" : null}`}>
                                &bull; Google Analytics - Übermittelt Informationen, die das Benutzherverhalten aufschlüsseln, um die Seite attraktiver und Lesitungsfähiger zu gestalten<br/>
                                &bull; Session Tracking  - Ermöglicht uns das Analysieren von Benutzeraktivitäten auf der Seite, um Sichtbarkeit und Performance zu verbessern<br/>
                            </p>
                        </li>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                        Marketing 
                                        <p className='text-sm text-fg opacity-60'>Diese Technologien werden von Werbetreibenden genutzt, um Anzeigen zu schalten, die für ihr Interesse relevant sind.</p>
                                    </div>
                                    <div className='functionContainer'>
                                        <label className="toggle">
                                            <input type="checkbox" id="toggleSwitch" checked={marketingCookie} onChange={()=>{setMarketing(!marketingCookie)}}/>
                                            <div className='toggleContainer'></div>
                                        </label>
                                        <button onClick={()=>toggleExtended(2)}  className={`uxCookieModalChev ${extended[2] ? "active" : null}`}><FaChevronDown className='text-fg'/></button>
                                    </div>
                                </div>
                            <p className={`cookieDetails ${extended[2] ? "show" : null}`}>
                                &bull; aktuell keine<br/>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="uxCookieModalButtons">
                <button onClick={()=>updateCookieSettings(0)} className='bg-neutral hover:bg-gray-400'>Speichern</button>
                <button onClick={()=>updateCookieSettings(2)} className='bg-neutral hover:bg-gray-400'>Ablehnen</button>
                <button onClick={()=>updateCookieSettings(1)} className='bg-green-300 hover:bg-green-400'>Alles akzeptieren</button>
            </div>
        </div>
        </div>
        <Modal msg='Cookie-Einstellungen erfolgreich angepasst!' type={1} show={success} />
        <Modal msg='Cookie-Einstellungen fehlgeschlagen. Bitte erneut versuchen!' type={-1} show={error} />
    </>
  );
};

export default CookieModal;