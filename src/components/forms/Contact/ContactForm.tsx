'use client'

import './ContactForm.css'
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaPhone } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'

import Loading from '@/app/loading';
import Modal from '@/components/ux/Modal/Modal';

function validateInput(email: string, name: string, surname: string, companyName: string, msg: string): Record<string, boolean> {
  return {
    'email': emailRegex.test(email),
    'name': nameRegex.test(name) || name.length == 0,
    'surname': nameRegex.test(surname),
    'companyName': compRegex.test(companyName) || companyName.length == 0,
    'msg': messageRegex.test(msg)
  }
}

const messageRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{10,}$/; 
const compRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{2,}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const client_sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', companyName: '', email: '', msg: '' });
  const [formDataValid, setFormDataValid] = useState<Record<string, boolean>>({});

  // state handling
  const [loading, setLoading] = useState<boolean>(false);
  const [validForm, setValidForm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
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

  const recaptchaRef = useRef<ReCAPTCHA>(null); 
  const [captcha, setCaptcha] = useState<string | null>();

  // Function to execute reCAPTCHA and set token
  const handleRecaptchaExecution = async () => {
    setLoading(true); // Start loading
    if (recaptchaRef.current) {
      try {
        const recaptchaToken = await recaptchaRef.current.executeAsync(); // Get token
        setCaptcha(recaptchaToken); // Save token
        return recaptchaToken;
      } catch (error) {
        setError(false);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const recaptchaToken = await handleRecaptchaExecution();

    if (recaptchaToken) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({ ...formData, captcha: recaptchaToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setSuccess(true);
          setFormData({companyName:'', email:'', msg:'', name:'', surname:''})
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }

    // Reset reCAPTCHA for the next use
    if (recaptchaRef.current) {
      recaptchaRef.current.reset(); // Reset to prepare for next execution
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update the formData state immediately
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Validate using the updated form data
    const bufferValidation = validateInput(
        updatedFormData.email,
        updatedFormData.name,
        updatedFormData.surname,
        updatedFormData.companyName,
        updatedFormData.msg
    );
    setFormDataValid(bufferValidation);
    setValidForm(Object.values(bufferValidation).every((isValid) => isValid === true));
  };

  return (
    <div className='pb-8 flex flex-col justify-start items-center gap-10 bg-bg pt-8 mt-16 w-full mb-16 text-fg relative'>
      <h2 className="text-2xl sm:text-4xl mb-14">Kontakt</h2>
      <div className='w-10/12 flex flex-row justify-evenly flex-wrap'>
        <div className='flex flex-col gap-2 text-center sm:text-left pt-8 w-1/2 pr-16 textContact'>
        <h4 className='whitespace-normal'>Willkommen auf unserer Kontaktseite! </h4>
        <p><br/> Als erfahrener Blechbearbeiter legen wir großen Wert auf Qualität und Kundenzufriedenheit. Unser Ziel ist es, Ihre Anforderungen präzise und termingerecht umzusetzen.
           <br/>Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie ein individuelles Angebot einholen? Zögern Sie nicht, uns zu kontaktieren. Füllen Sie einfach das Formular aus oder kontaktieren Sie uns direkt über <b>vertrieb@atbs.de</b>, und wir melden uns schnellstmöglich bei Ihnen.
           <br/>Wir freuen uns darauf, Ihnen weiterhelfen zu können! <br/><br/>
        </p>
        <p className='locations mt-8 text-lg text-center font-bold'>Unsere Standorte</p>
        <div className='locations flex flex-row justify-evenly mt-8'>
          <div>
              <p className='text-sm font-bold mb-4'>Braunschweig</p>
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
          </div>
          <div>
            <p className='text-sm font-bold  mb-4'>Lengede</p>
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
          </div>
        </div>
        <form className='max-w-3xl flex flex-col justify-start gap-10 rounded-md shadow-fg shadow-md px-8 py-8 h-fit' onSubmit={handleSubmit}>
          <h4>Nachricht senden:</h4>
          <div className="formContainer">              
            <label className='formLabel' htmlFor="name">Vorname:</label>
            <input className={`formInput border-b-2 border-fg border-opacity-10 
                               ${formDataValid!['name'] && formData.name.length > 0 ? 'border-2 border-green-300 border-opacity-80' : null}
                               ${!formDataValid!['name'] && formData.name.length > 0 ? 'border-2 border-red-300 border-opacity-80' : null}`} 
                    type="text" id="name" name="name" onChange={handleChange} value={formData.name}/> <br/>
          </div>
          <div className="formContainer">   
            <label className='formLabel' htmlFor="surname">Nachname*:</label>
            <input  className={`formInput border-b-2 border-fg border-opacity-10 
                               ${formDataValid!['surname'] && formData.surname.length > 0 ? 'border-2 border-green-300 border-opacity-80' : null}
                               ${!formDataValid!['surname'] && formData.surname.length > 0 ? 'border-2 border-red-300 border-opacity-80' : null}`} 
                    type="text" id="surname" name="surname" onChange={handleChange} value={formData.surname}/> <br/>
          </div>
          <div className="formContainer">   
            <label className='formLabel' htmlFor="companyName">Unternehmen:</label>
            <input  className={`formInput border-b-2 border-fg border-opacity-10 
                               ${formDataValid!['companyName'] && formData.companyName.length > 0 ? 'border-2 border-green-300 border-opacity-80' : null}
                               ${!formDataValid!['companyName'] && formData.companyName.length > 0 ? 'border-2 border-red-300 border-opacity-80' : null}`} 
                    type="text" id="companyName" name="companyName" onChange={handleChange} value={formData.companyName}/> <br/>          
          </div>
          <div className="formContainer">   
            <label className='formLabel' htmlFor="email">E-Mail*:</label>
            <input  className={`formInput border-b-2 border-fg border-opacity-10 
                               ${formDataValid!['email'] && formData.email.length > 0 ? 'border-2 border-green-300 border-opacity-80' : null}
                               ${!formDataValid!['email'] && formData.email.length > 0 ? 'border-2 border-red-300 border-opacity-80' : null}`} 
                    type="email" id="email" name="email" onChange={handleChange} value={formData.email}/> <br/>
          </div>
          <div className="formContainer">   
            <label className='formLabel' htmlFor="message">Nachricht*:</label>
            <textarea className={`formInput formText border-b-2 border-fg border-opacity-10 
                               ${formDataValid!['msg'] && formData.msg.length > 0 ? 'border-2 border-green-300 border-opacity-80' : null}
                               ${!formDataValid!['msg'] && formData.msg.length > 0 ? 'border-2 border-red-300 border-opacity-80' : null}`} 
                      id="msg" name="msg" onChange={handleChange} value={formData.msg}/> <br/>
          </div>
          <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={client_sitekey!} onChange={setCaptcha}/>
          <button className={`px-4 py-2 rounded-md shadow-md bg-opacity-30 hover:bg-opacity-50 ease-in-out transition-all duration-300 ${validForm ? 'pointer-events-auto cursor-pointer bg-green-300' : 'pointer-events-none bg-neutral'}`} type="submit">
            {!loading ? (<p className='cursor-pointer'>Senden</p>) : (<Loading type={'text'}/>)}
          </button>
        </form>
      </div>
      <Modal msg='Deine Nachricht wurde erfolgreich übermittelt. Vielen Dank!' type={1} show={success} />
      <Modal msg='Validierung fehlgeschlagen. Bitte erneut versuchen!' type={-1} show={error} />
    </div>
);
};

export default ContactForm;
