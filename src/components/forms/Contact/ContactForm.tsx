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
    <div className='flex flex-col justify-start items-center gap-10 w-full text-fg relative'>
      <div className='flex flex-row justify-between w-full p-2 sm:p-8 flex-wrap min-[1208px]:gap-8'>
        <div className='locations flex flex-col justify-between max-[1208px]:w-full w-[30%]'>
          <h1 className='min-[1500px]:text-6xl text-5xl mb-12'>So <span className='text-blue-300'>kontaktierst</span> du die ATBS.</h1>
          <div className='flex flex-col w-full max-[700px]:hidden max-[1208px]:flex-row max-[1208px]:justify-between max-[1208px]:px-8'>
            <div className='mb-8 lg:mb-16'>
                <p className='text-xl xl:text-2xl font-bold mb-4'>Braunschweig</p>
                <div className='flex-row flex items-center gap-4 justify-normal  text-left'>
                  <FaPhone className='text-fg'/> 
                  <a href='callto:05307204120' className='text-xl xl:text-2xl'><p className='text-xl xl:text-2xl'>+49(0)5307 / 204120 </p>  </a>    
                </div>
                <div className='flex-row flex items-center gap-4 justify-normal'>
                  <FaHome className='text-fg'/>         
                  <p className='text-xl xl:text-2xl text-justify'>  
                    Industriestraße 7<br />
                    38110 Braunschweig<br /> <br />
                  </p>  
                </div>
            </div>
            <div>
              <p className='text-xl xl:text-2xl font-bold  mb-4'>Lengede</p>
              <div className='flex-row flex items-center gap-4 justify-normal'>
                <FaPhone className='text-fg'/> 
                <a href='callto:05344261236' className='text-xl xl:text-2xl'><p className='text-xl xl:text-2xl'>+49(0)5344 / 261-236</p>   </a>    
              </div>
              <div className='flex-row flex items-center gap-4 justify-normal'>  
                <FaHome className='text-fg'/>         
                <p className='text-xl xl:text-2xl text-justify'>  
                  Lise-Meitner-Straße 7B<br />
                  38268 Lengede<br /> <br />
                </p>  
              </div>
            </div>
          </div>
        </div>
        <form className='flex flex-col justify-start gap-6 rounded-[40px] bg-slate-200 p-8 lg:p-16 h-fit max-[1208px]:w-full w-2/3' onSubmit={handleSubmit}>
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
            {!loading ? (<p className='cursor-pointer text-dark'>Senden</p>) : (<Loading type={'text'}/>)}
          </button>
        </form>
      </div>
      <Modal msg='Deine Nachricht wurde erfolgreich übermittelt. Vielen Dank!' type={1} show={success} />
      <Modal msg='Validierung fehlgeschlagen. Bitte erneut versuchen!' type={-1} show={error} />
    </div>
);
};

export default ContactForm;
