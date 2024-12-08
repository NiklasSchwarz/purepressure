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
        <button className={`text-4xl bg-gray-300 text-dark rounded-full shadow-lg w-16 fixed bottom-4 left-4 h-16 hover:bg-gray-400 duration-200 transition-all ease-in-out ${!hidden ? "pointer-events-none" : null}`} 
                onClick={() => triggerHidden(!hidden)}>
            <FaCookieBite className='m-auto'/>
        </button>
        <div className={`uxCookieModal ${hidden ? "hidden" : null}`}>
        <div className='uxCookieModalContent text-fg flex flex-col justify-between'>
            <div className="uxCookieModalWrap">
                <div className="flex flex-row justify-between"><h3>Privacy Settings</h3><button onClick={() => triggerHidden(true)}><FaTimes className='text-2xl'/></button></div>
                <p>If you consent, we use third-party services that store or retrieve information on the end device of a site visitor. We then process the information further. All of this helps us to optimise our website and better understand our visitors. You can revoke your consent with effect for the future, e.g. on the left-hand side on the fingerprint.</p>
                <div className="uxCookieModalTextLink"><a href="/imprint" onClick={() => triggerHidden(!hidden)}>Imprint</a><a href="/privacy" onClick={() => triggerHidden(!hidden)}>Privacy</a></div>
                <div>
                    <h4 className='mb-4'>Cookies</h4>
                    <ul>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                    Essential 
                                    <p className='text-sm text-fg opacity-60'>These technologies are required to ensure the core functionality of this site.</p>
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
                                &bull; Google ReCaptcha - Prevents bots from using the site <br/>
                                &bull; Session Cookies  - store temporary information during a user's session<br/>
                                &bull; Safety Cookies  - These cookies are necessary to ensure security<br/>
                                &bull; Cookie-Consent  - Saves the user's decision regarding consent to non-essential cookies.<br/>
                            </p>
                        </li>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                    Functional 
                                    <p className='text-sm text-fg opacity-60'>The use of these technologies enables us to analyse the use of the site in order to measure and improve performance.</p>
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
                                &bull; Google Analytics - Transmits information that breaks down user behaviour to make the site more attractive and readable<br/>
                                &bull; Session Tracking  - Allows us to analyse user activity on the site to improve visibility and performance<br/>
                            </p>
                        </li>
                        <li className='uxCookieModalCookies'>
                            <div className='contentContainer'>
                                <div className='w-4/5'>
                                        Marketing 
                                        <p className='text-sm text-fg opacity-60'>These technologies are used by advertisers to place adverts that are relevant to their interests.</p>
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
                                &bull; none<br/>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="uxCookieModalButtons">
                <button onClick={()=>updateCookieSettings(0)} className='bg-gray-300 hover:bg-gray-400'>Save Settings</button>
                <button onClick={()=>updateCookieSettings(2)} className='bg-gray-300 hover:bg-gray-400'>Deny</button>
                <button onClick={()=>updateCookieSettings(1)} className='bg-green-300 hover:bg-green-400'>Accept all</button>
            </div>
        </div>
        </div>
        <Modal msg='Cookie-Settings successfully customised!' type={1} show={success} />
        <Modal msg='Cookie-Settings failed. Please try again!' type={-1} show={error} />
    </>
  );
};

export default CookieModal;