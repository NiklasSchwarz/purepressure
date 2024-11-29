"use client"

import './Carrer.css'
import '@/components/ux/Jobs/Jobs.css'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Job, JobsData } from './CarrerItem';

//Images
import Image from 'next/image'
import Loading from '@/app/loading';
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from '@/components/ux/Modal/Modal';
import { FaLocationArrow } from 'react-icons/fa';

// client site input validation
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const client_sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
function validateInput({email, surname, name} : {email: string, surname: string, name: string}): boolean {
  return emailRegex.test(email) && nameRegex.test(surname) && nameRegex.test(name);
}


const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("Initiativ");
  const [loading, setLoading] = useState<number>(1);
  
  const [formData, setFormData] = useState({ name: '', surname: '', email: ''});
  
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validFile, setValidFile] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file) {
      setValidFile(false);
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError(true);
      setSelectedFile(null);
      return;
    }

    if (file.size > 40*1024*1024) {
      setError(true);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setValidFile(true);
    setValidForm(validateInput(formData)); 
  }

  // state handling
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
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
    setLoadingForm(true); // Start loading
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
    const formDataToSubmit = new FormData();

    // Append other form data fields
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("surname", formData.surname);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("job", selectedJob);

    if (recaptchaToken) {
      formDataToSubmit.append("captcha", recaptchaToken);
      // Append the selected file (check if file exists)
      if (selectedFile) {
        formDataToSubmit.append("file", selectedFile);
      }

      try {
        // Fetch request to submit the form data
        const response = await fetch("/api/apply", {
          method: "POST",
          body: formDataToSubmit, // Use FormData directly
        });
        if (response.ok) {
          setSuccess(true);
          setFormData({email:'', surname:'', name:''})
          setSelectedFile(null);
          setSelectedJob('Initiativ');
          setShowPopup(false);
          setValidForm(false);
          
          // Clear the input field manually (if needed)
          const fileInput = document.getElementById('pdf') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''; // Clear the file input value
          }
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
    setLoadingForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the formData state immediately
    const updatedFormData = { ...formData, [name]: value };
    setFormData({email: updatedFormData.email, name: updatedFormData.name, surname:updatedFormData.surname});
    const isValid = validateInput(updatedFormData); // Validate with updated data

    setValidForm(isValid && validFile); // Update validForm based on validation
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // Lade die JSON-Datei
    fetch('/jobs.json')
      .then(response => response.json())
      .then((data: JobsData) => {
        setJobs(data.jobs);
        setLoading(0);
        }
      )
      .catch(error => {
        setLoading(-1)
      }
    );
  }, []);

  const toggleJobDetails = (index: number) => {
    setExpandedJobIndex(expandedJobIndex === index ? null : index);
  };

  return (
      <>
      {loading === 1 &&  (
        <div className='mt-10'><Loading /></div>
      )}
          {loading === 0 &&  (
            <div className='bg-opacity-0 bg-bg'>
              {jobs.map((job, index) => (
                <div key={index} className={`${expandedJobIndex === index ? 'active' : ''} job`} onClick={() => toggleJobDetails(index)}>
                <div className="jobHeader">
                  <h2 className='jobHeading'>{job.job_title}</h2>
                  <p className='cursor-pointer'>{job.description}</p>
                </div>
                <div className={expandedJobIndex === index ? "jobDetails show" : "jobDetails" }>
                <div>
                    <h3 className='jobDetailsHeader'>Ihre Aufgaben:</h3>
                    <ul>
                      {job.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className='jobDetailsHeader'>Ihr Profil:</h3>
                    <ul>
                      {job.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className='jobDetailsHeader'>Was wir ihnen bieten können:</h3>
                    <ul>
                      {job.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                </div>
              ))}
              </div>
          )}
          {loading === -1 &&  (
            <h3 className='mt-10 m-auto text-primary font-semibold'>Aktuell sind keine Stellenangebote online!</h3>
          )}
          <div className="jobs">
            <div className='jobs_heading'>
              <h1 className=' mb-8 sm:mb-16 xl:mb-0'>Sie haben <span className='font-semibold text-blue-400'>ihren</span> neuen Job gefunden?</h1>  
              <div className='lg:block hidden'>
                <p>Falls Sie kein passendes Stellenangebot gefunden haben, nehmen wir gerne Initiativbewerbungen entgegen.
                  Sollten wir Ihr Interesse geweckt haben, so richten Sie bitte Ihre aussagekräftige Bewerbung an folgende Adresse oder nutzen Sie unser Online-Bewerbungsverfahren. <br/> <br/>
                </p>
                  <span className='flex flex-row gap-10 items-center'>
                    <FaLocationArrow className='text-6xl text-blue-300'/>
                    <p>
                      <b>ATBS Braunschweig </b><br />
                      Personalwesen<br />
                      Industriestraße 7<br />
                      38110 Braunschweig
                    </p>
                  </span>
              </div>
            </div>
            <div className="relative w-full lg:w-[55%] rounded-[40px] h-100% bg-black">
              <Image src={'/images/interview.jpg'}
                  alt="Image Card"
                  width={1000}
                  height={600}
                  loading="lazy"
                  className="jobs_image"
              /> 
              <div className='jobs_txt'>
                <div className="sm:p-8">
                  <button className='CarrerButtonBtn' onClick={togglePopup}>Online Bewerbung</button>
                </div>
              </div>
            </div>
            <div className='lg:hidden block mt-8'>
              <p>Falls Sie kein passendes Stellenangebot gefunden haben, nehmen wir gerne Initiativbewerbungen entgegen.
                 Sollten wir Ihr Interesse geweckt haben, so richten Sie bitte Ihre aussagekräftige Bewerbung an folgende Adresse oder nutzen Sie unser Online-Bewerbungsverfahren. <br/> <br/> 
              </p>
              <span className='flex flex-row gap-10 items-center'>
                <FaLocationArrow className='text-6xl text-blue-300'/>
                <p>
                  <b>ATBS Braunschweig </b><br />
                  Personalwesen<br />
                  Industriestraße 7<br />
                  38110 Braunschweig
                </p>
              </span>
            </div>
          </div>
          <div className={`Overlay ${showPopup ? '' : 'hidden'}`} onClick={togglePopup}>
            <div className={`relative popup ${showPopup ? '' : 'hidden'}`} onClick={e => e.stopPropagation()}>
            <div className='mt-44 sm:mt-0 w-fit mx-auto'>
              <h2 className='text-fg my-8 mx-auto'>Online Bewerbung</h2>
            </div>
            <div className='flex flex-row flex-wrap justify-between w-full apply_form'>
              <form className='w-full m-0' onSubmit={handleSubmit}>
              <div className='flex flex-col col-span-2 mb-5 gap-0 w-full md:w-1/2 overflow-hidden'>
                  <div className='form-parent py-2 text-fg flex flex-col sm:flex-row w-full justify-between'>
                    <label htmlFor="dropdown">Stellenangebot:</label>
                    <select id="dropdown" name="dropdown" className='text-bg sm:w-1/2 cursor-pointer' required value={selectedJob} onChange={(e)=>{setSelectedJob(e.target.value)}}>
                    {jobs.map((job, index) => (
                      <option key={job.job_title + index} value={job.job_title}>{job.job_title}</option>
                    ))}
                    <option value="Initiativ">Initiativ</option>
                  </select>
                  </div>
                  <div className='form-parent py-2 text-fg flex flex-col sm:flex-row w-full justify-between'>
                    <label htmlFor="name">Vorname:</label>
                    <input className='input-field' type="text"  id="name" name="name" value={formData.name} required onChange={handleChange}/>
                  </div>
                  <div className='form-parent py-2 text-fg flex flex-col sm:flex-row w-full justify-between'>
                    <label htmlFor="surname">Nachname:</label>
                    <input className='input-field' type="text"  id="surname" name="surname" value={formData.surname} required onChange={handleChange}/>
                  </div>
                  <div className='form-parent py-2 text-fg flex flex-col sm:flex-row w-full justify-between'>
                    <label htmlFor="email">Email:</label>
                    <input className='input-field' type="email" id="email" name="email" value={formData.email} required onChange={handleChange}/>
                  </div>
                  <div className='form-parent py-2 text-fg flex flex-col sm:flex-row w-full justify-between gap-2'>
                    <label htmlFor="pdf">Dokumente(PDF):</label>
                    <input className='input-file text-ellipsis whitespace-nowrap cursor-pointer'  type="file"  id="pdf" name="pdf" accept="application/pdf" required onChange={(e)=>{handleFileChange(e)}}/>
                  </div>
              </div>
              <p className='mb-5 text-sm'>Schicken Sie uns schnell und sicher ihre Bewerbungsunterlagen zu! Wir bedanken uns für ihr Interesse und melden uns schnellst möglich bei ihnen.</p>
                <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={client_sitekey!} onChange={setCaptcha}/>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                <button className={`buttonCarrer text-light ease-in-out transition-all duration-300 ${validForm ? 'cursor-pointer bg-green-300' : 'pointer-events-none bg-gray-500'}`} type="submit">
                  {!loadingForm ? (<p className='cursor-pointer text-light'>Senden</p>) : (<Loading type={'text'}/>)}
                </button>
                <button className="close-button text-light" onClick={togglePopup}>Abbrechen</button>
                </div>
              </form>
              <Image className="absolute right-8 top-1/2 -translate-y-1/2 worker_img w-1/3 h-fit md:block hidden" src='/images/maschine_worker.png' alt='WORKER_IMG' width={700} height={700}></Image>
            </div>
          </div>
        </div>
        <Modal msg='Deine Bewerbung wurde erfolgreich übermittelt. Vielen Dank!' type={1} show={success} />
        <Modal msg='Fehlgeschlagen. Bitte erneut versuchen oder einen anderen Weg probieren!' type={-1} show={error} />
        </>
  );
};

export default Jobs;
