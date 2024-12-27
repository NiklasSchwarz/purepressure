"use client"
import './booking.css'
import { Calendar } from "@/components/ui/calendar"
import { useSearchParams } from 'next/navigation'

import ReCAPTCHA from 'react-google-recaptcha';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../loading';
import Modal from '@/components/ux/Modal/Modal';
import Head from '@/components/ux/Head/Head';
import Prices from '@/components/ux/Prices/Prices';
import Sizing from '@/components/ux/Prices/Sizing';

type Specs = "small" | "medium" | "large" | "month" | "once" | "bi-monthly";
type Service = "bronze" | "silver" | "gold" | "platinum" | "showroom" | "trash";

type PricingTable = {
  [key in Service]: {
    [key in Specs]?: number;
  } & { default?: number };
};

const pricingTable: PricingTable = {
  bronze: { small: 9, medium: 13, large: 17 },
  silver: { small: 19, medium: 24, large: 29 },
  gold: { small: 50, medium: 55, large: 59 },
  platinum: { small: 100, medium: 120, large: 140 },
  showroom: { small: 150, medium: 200, large: 250 },
  trash: { month: 9, once: 39, default: 15 },
};

function getPrice(service: string, specs: string, multiplier: number): number {
  console.log(multiplier)
  if (!isService(service) || !isSpecs(specs)) {
    console.warn(`Invalid service or specs: ${service}, ${specs}`);
    return 0;
  }
  const price = pricingTable[service]?.[specs] ?? pricingTable[service]?.default ?? 0;
  return price * multiplier;
}

// Type guards for safety
function isService(value: string): value is Service {
  return ["bronze", "silver", "gold", "platinum", "showroom", "trash"].includes(value);
}

function isSpecs(value: string): value is Specs {
  return ["small", "medium", "large", "month", "once", "bi-monthly"].includes(value);
}

function validateInput(email: string, name: string, surname: string, zip: string, nr: string, street: string, state: string, phone:string): Record<string, boolean> {
  return {
    'email': emailRegex.test(email),
    'name': nameRegex.test(name),
    'surname': nameRegex.test(surname),
    'street': nameRegex.test(street),
    'state': nameRegex.test(state),
    'zip': zipReg.test(zip),
    'nr': nrReg.test(nr),
    'phone': phoneRegex.test(phone)
  }
}

function validateInputCancel(email: string, name: string, surname: string, id: string): Record<string, boolean> {
  return {
    'email': emailRegex.test(email),
    'name': nameRegex.test(name),
    'surname': nameRegex.test(surname),
    'id': uuidRegex.test(id)
  }
}

const phoneRegex = /^\+?[1-9]\d{1,14}$|^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const nrReg = /^[A-Za-z0-9]{1,}$/; 
const zipReg = /^[0-9]{5}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const uuidRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s'-.]{36,}$/;
const client_sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

async function getDiscount(disc: string | null | undefined) {
  // return 0 if no discount is used
  if (disc == null || disc == '') return 0 

  const response = await fetch('/api/discount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ disc }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.percentage;
  } else {
    return 0;
  }
}

async function getZipCodeMoltiplier(zip: string) {
  const response = await fetch('/api/postcode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postcode: zip }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    return data.multiplier;
  } else {
    const error = await response.json();
    console.error(error.message);
    return null;
  }
}

async function getTimeslots(date: Date) {
  let parse_date:string = ""
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  parse_date = day + "-" + month + "-" + year
  const response = await fetch('/api/timeslots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: parse_date }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    return data.timeslots;
  } else {
    return [];
  }
}

const Appointment = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', zip: '', nr:'', street:'', state:'', internalWash: true, phone:''});
  const [formDataCancel, setFormDataCancel] = useState({ name: '', surname: '', email: '', id: ''});
  const searchParams = useSearchParams()
  const disc_key = searchParams?.get('disc_key')
  const [price, setPrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [service, setService] = useState("bronze")
  const [specs, setSpecs] = useState("small")
  const [selTrash, setSelTrash] = useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [multiplierZip, setMultiplier] = useState<number>(1)
  const [timeslots, setTimeslots] = useState<string[]>(["8:00 AM", "9:30 AM", "11:00 AM", "12:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"])
  const [selTimeslot, setSelTimeslot] = useState<string | null>(null)
  const [loadTimeslots, setLoadTimeslots] = useState(false)
  const [formDataValid, setFormDataValid] = useState<Record<string, boolean>>({})
  const [formDataValidCancel, setFormDataValidCancel] = useState<Record<string, boolean>>({})
  const [validFormCancel, setValidFormCancel] = useState<boolean>(false)
  const [validForm, setValidForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [error3, setError3] = useState<boolean>(false);
  const [error_zip, setErrorZip] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [success2, setSuccess2] = useState<boolean>(false);
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
  
  useEffect(() => {
    if (formData.internalWash) {
      setPrice(getPrice(service, specs, 1))
    }
    else { 
      setPrice(getPrice(service, specs, multiplierZip))
    }
  }, [multiplierZip, service, specs, formData.internalWash]); 

  useEffect(()=> {
    async function getDiscountHelper() {
      try {
        const disc = await getDiscount(disc_key);
        setDiscount(disc)
      } catch (error) {
        setDiscount(0)
        setError(true);
      }
    }
    getDiscountHelper();
  }, [price]);

  useEffect(() => {
    // If success changes and is true, set timeout to reset it after 2 seconds
    if (error || success || error_zip || error3 || success2) {
      const timer = setTimeout(() => {
        setError(false); // Reset to null after 2 seconds
        setSuccess(false);
        setErrorZip(false);
        setError3(false);
        setSuccess2(false);
      }, 2000);

      // Cleanup the timer when component unmounts or `error` changes
      return () => clearTimeout(timer);
    }
  }, [error, success, error_zip, error3, success2]);
  
  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
  
    // Update the formData state immediately
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Validate using the updated form data
    const bufferValidation = validateInput(
        updatedFormData.email,
        updatedFormData.name,
        updatedFormData.surname,
        updatedFormData.zip,
        updatedFormData.nr,
        updatedFormData.street,
        updatedFormData.state,
        updatedFormData.phone
      );
    setFormDataValid(bufferValidation);

    let trash_zip_relation = true;
    if (e.target.name != "service" && e.target.value == "trash" ) {
      if (updatedFormData.internalWash) {
        trash_zip_relation = false;
      }
    }
    setValidForm(Object.values(bufferValidation).every((isValid) => isValid === true) && trash_zip_relation && (selTimeslot !== null));
  };

  const handleInputFieldChangeCancel = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update the formData state immediately
    const updatedFormData = { ...formDataCancel, [name]: value };
    setFormDataCancel(updatedFormData);

    // Validate using the updated form data
    const bufferValidation = validateInputCancel(
        updatedFormData.email,
        updatedFormData.name,
        updatedFormData.surname,
        updatedFormData.id   
    );
    setFormDataValidCancel(bufferValidation);
    setValidFormCancel(Object.values(bufferValidation).every((isValid) => isValid === true));
  };

  const handleTimeslots = async () => {
    setLoadTimeslots(true); // Start loading
    if (date) {
      try {
        const timeslots = await getTimeslots(date); // Get token
        setTimeslots(timeslots)
      } catch (error) {
        setTimeslots([]);
        setError(true);
      }
    }
    setLoadTimeslots(false);
  };

  const handleZipCode = async () => {
    if (formData.zip == '') return;
    if (formDataValid['zip'] || !formData.internalWash) {
      try {
        const multiplier = await getZipCodeMoltiplier(formData.zip); 
        if (multiplier) {
          setMultiplier(multiplier)
          if(service == "trash") {
            setFormData((prevData) => ({
              ...prevData,
              internalWash: false,
            }));
          }
          return;
        }
        throw Error;
      } catch (error) {
        if(service == "trash") {
          setValidForm(false);
        }
        setFormData((prevData) => ({
          ...prevData,
          internalWash: true,
        }));
        setErrorZip(true);
        setMultiplier(1);
      }
      return;
    }
  }
  
  useEffect(()=> {
    if(formData.internalWash || formData) {
      handleZipCode();
    }
  }, [formData.internalWash, formData.zip]);

  useEffect (()=> {
    handleInputFieldChange
  },[selTimeslot]);

  useEffect (()=> {
    if(date) {
      handleTimeslots();
    }
  },[date]);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; 
  };

  const handleService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value)
    handleInputFieldChange(event)

    if (event.target.value == "trash" && !selTrash) {
      setSelTrash(true)
      setFormData((prevData) => ({
        ...prevData,
        internalWash: false,
      }));
      setSpecs("month")
    } else if (event.target.value != "trash" && selTrash) {
      setFormData((prevData) => ({
        ...prevData,
        internalWash: true,
      }));
      setSelTrash(false)
      setSpecs("small")
    }
  }

  const handleSpecs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecs(event.target.value)
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const recaptchaToken = await handleRecaptchaExecution();

    if (recaptchaToken) {
      const real_costs = price * (1-discount);
      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          body: JSON.stringify({ ...formData, captcha: recaptchaToken, date:date, service:service, specs:specs, price:real_costs, timeslot:selTimeslot }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setSuccess(true);
          setFormData({email:'', internalWash:false, name:'', surname:'', nr:'', state:'', street:'', zip:'', phone:''})
          setService('bronze');
          setSpecs('small');
          setSelTimeslot('');
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
    handleTimeslots();
    handleInputFieldChange
    setLoading(false);
  }

  const submitCancel = async (event: React.FormEvent) => {
    event.preventDefault();
    const recaptchaToken = await handleRecaptchaExecution();

    if (recaptchaToken) {
      try {
        const response = await fetch("/api/cancel", {
          method: "POST",
          body: JSON.stringify({ ...formDataCancel, captcha: recaptchaToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setSuccess2(true);
          setFormDataCancel({email:'', name:'', surname:'', id:''})
        } else {
          setError3(true);
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
  }

  return (
    <>
    <section>
    <Head imageSrc={'/images/white_chev.jpeg'} imageAlt={'Header Iimg'} heading={'Booking'} subtitle={'Manage your appointments with ease'} text={'Book a new appointment or cancel an existing one quickly and conveniently.'} btn={false}></Head>
    </section>
    <section>
      <h1 className='mb-20 text-start w-full'>Price Reminder</h1>
      <Prices></Prices>
    </section>
    <section>
      <Sizing></Sizing>
    </section>
    <section className='text-left justify-start items-start'>
      <h2 className='p-8'>Book an appointment</h2>
      <form id='book'  className="appointment-form-container" onSubmit={submit}>
        <div className="tab">
          <h4>Select a service:</h4>
          <div className="services">
          {/*{["bronze", "silver", "gold", "platinum", "showroom", "trash"].map((item) => ( */}
          {["bronze", "silver", "gold", "platinum", "showroom"].map((item) => (
              <label
                key={item}
                className={`${service === item ? "bg-green-300 text-light" : "bg-gray-50 text-dark"} radio-service hover:brightness-[.97]`}
                >
                <input
                  type="radio"
                  value={item}
                  name="service"
                  onChange={handleService}
                  />
                <p>{item.charAt(0).toUpperCase() + item.slice(1)}{item == "trash" ? " Can *" : ""}</p>
                </label>
            ))}
          </div>
        </div>
        <div className="tab">
          <h4>Specification:</h4>
          <div>
            <div className={`${selTrash ? "opacity-40 pointer-events-none" : "opacity-100"} services`}>
            {["small", "medium", "large"].map((item) => (
              <label
                key={item}
                className={`${specs === item ? "bg-green-300 text-light" : "bg-gray-50 text-dark"} radio-specs hover:brightness-[.97]`}
              >
                <input
                  type="radio"
                  value={item}
                  name="specs"
                  onChange={handleSpecs}
                  />
                <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                </label>
            ))}
            </div>
            {/*
            <div className={`${selTrash ? "opacity-100" : "opacity-40 pointer-events-none"} services`}>
              {["month", "bi-monthly", "once"].map((item) => (
                <label
                  key={item}
                  className={`${specs === item ? "bg-green-300 text-light" : "bg-gray-50 text-dark"} radio-specs hover:brightness-[.97]`}
                  >
                  <input
                    type="radio"
                    value={item}
                    name="specs"
                    onChange={handleSpecs}
                  />
                  <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                  </label>
              ))}
            </div>
            <p>* Please select the date, where the trash is collected. You only need to book the first appointment. Every other is scheduled after the first clean.</p>
            */}
          </div>
        </div>
        <div className="tab">
          <h4>Date:</h4>
          <div className='flex gap-x-4 w-full justify-start max-[560px]:flex-col items-start'>
          <Calendar
            mode="single"
            selected={date}
            fromDate={new Date()}
            disabled = {(date: Date) => isWeekend(date)}
            onSelect={setDate}
            className="rounded-lg border bg-gray-50 shadow-lg w-fit h-fit"
            />
          <div className="timeslots-grid">
          {loadTimeslots ? (
              <div className="w-[300px] flex items-center justify-center mx-auto"><Loading/></div>
            ) : (
              timeslots.length === 0 ? (
                <p>No timeslots available at this date</p>
              ) : (
                timeslots.map((timeslot) => (
                  <label
                  key={timeslot} 
                  className={`${selTimeslot === timeslot ? "bg-green-300 text-light" : "bg-gray-50 text-dark"} timeslots hover:brightness-[.97]`}
                  >
                    <input
                      type="radio"
                      value={timeslot}
                      name="timeslots"
                      onChange={(event) => setSelTimeslot(event.target.value)}
                    />
                    <p>{timeslot}</p>
                  </label>
                ))
              )
            )}
          </div>
          </div>
        </div>
        <div className="tab">
          <h4>Address:</h4>
          <div>
            <div className='grid grid-cols-1 min-[900px]:grid-cols-[400px_200px] min-[1200px]:grid-cols-[600px_200px] gap-4'>
              <div className="input-wrapper w-full">
                <div className="req"><input type="text" id="street" name="street" className={`input-field border-b-2 border-opacity-50
                                ${formDataValid['street'] ? 'border-green-300' : null}
                                ${!formDataValid!['street'] ? 'border-red-300' : null}
                                ${formData.street.length == 0 ? 'border-neutral' : null}`}  required placeholder='Street name' onChange={handleInputFieldChange} value={formData.street}/> </div>
                <div className="req"><input type="text" id="nr" name="nr" className={`input-field border-b-2 border-opacity-50
                                ${formDataValid['nr'] ? 'border-green-300' : null}
                                ${!formDataValid!['nr'] ? 'border-red-300' : null}
                                ${formData.nr.length == 0 ? 'border-neutral' : null}`}  required placeholder='House Nr.' onChange={handleInputFieldChange} value={formData.nr}/></div>
                <div className="req"><input type="text" id="state" name="state" className={`input-field border-b-2 border-opacity-50
                                ${formDataValid['state'] ? 'border-green-300' : null}
                                ${!formDataValid!['state'] ? 'border-red-300' : null}
                                ${formData.state.length == 0 ? 'border-neutral' : null}`}  required placeholder='State' onChange={handleInputFieldChange} value={formData.state} /></div>
                <div className="req"><input type="text" id="zip" name="zip" className={`input-field border-b-2 border-opacity-50
                                ${formDataValid['zip'] ? 'border-green-300' : null}
                                ${!formDataValid!['zip'] ? 'border-red-300' : null}
                                ${formData.zip.length == 0 ? 'border-neutral' : null}`}  required placeholder='ZIP-Code' onChange={handleInputFieldChange} value={formData.zip} /></div>
              </div>
              <label className={`${formData.internalWash ? "bg-green-300" : "bg-gray-50"} ${(selTrash && formData.internalWash) || error_zip ? "pointer-events-none opacity-50" : "cursor-pointer"} px-8 py-6 rounded-lg shadow-lg hover:brightness-[.97] transition-all flex gap-4 items-center`}>
                <input name="internalWash" checked={formData.internalWash} onChange={handleInputFieldChange} type='checkbox'/>
                <p className='font-medium text-dark cursor-pointer text-wrap break-words'>Clean at Pure <br className='max-[900px]:hidden'/> Pressure *</p>
              </label>
              {/*<p>* A transportation fee is added, if you want to get your car washed at your place. Trash Cans can only be cleaned internally.</p> */}
            </div>
            <p className='pt-4'>* If you select "Clean at Pure Pressure", you agree to deliver your car at least 10 minutes before your appointment at Pure Pressure location. No additional transportation fees are added. If you want to get your car washed at a specific address, you need to provide easy access to water & electricity. A transportation fee is added.</p>
          </div>
        </div>
        <div className="tab">
          <h4>Personal data:</h4>
          <div className="flex flex-col w-full gap-2 max-w-[608px]">
          <div className="req"><input type="email" id="email" name="email" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['email'] ? 'border-green-300' : null}
                               ${!formDataValid!['email'] ? 'border-red-300' : null}
                               ${formData.email.length == 0 ? 'border-neutral' : null}`}  required placeholder='E-Mail' onChange={handleInputFieldChange} value={formData.email} /></div>
          <div className="req"><input type="tel" id="phone" name="phone" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['phone'] ? 'border-green-300' : null}
                               ${!formDataValid!['phone'] ? 'border-red-300' : null}
                               ${formData.phone.length == 0 ? 'border-neutral' : null}`}  required placeholder='Phone number e.g. +44847097323' onChange={handleInputFieldChange} value={formData.phone} /></div>
          <div className="input-wrapper-2">
            <div className="req"><input type="text" id="name" name="name" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['name'] ? 'border-green-300' : null}
                               ${!formDataValid!['name'] ? 'border-red-300' : null}
                               ${formData.name.length == 0 ? 'border-neutral' : null}`}  required placeholder='Name' onChange={handleInputFieldChange} value={formData.name}/></div>
            <div className="req"><input type="text" id="surname" name="surname" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['surname'] ? 'border-green-300' : null}
                               ${!formDataValid!['surname'] ? 'border-red-300' : null}
                               ${formData.surname.length == 0 ? 'border-neutral' : null}`}  required placeholder='Surname' onChange={handleInputFieldChange} value={formData.surname}/></div>
            </div>
          </div>
        </div>
        <div className="tab">
          <h4>Original Cost:</h4>
          <p className='text-xl text-neutral font-light'>$ {price.toFixed(2)} Service & Fee</p> 
        </div>
        <div className="tab">
          <h4>Charged:</h4>
          <div className="flex w-full max-[765px]:flex-col  gap-y-8 justify-between">
            <div className='w-full'>
              {discount !== 0 ? (
                <h3> ${(price * (1 - discount)).toFixed(2)} <span className='text-lg text-red-300 font-light'>{discount*100}% discount applied</span></h3>
              ) : <h3> ${price.toFixed(2)}</h3>}
              <p>Payment due after completion of the service</p>
            </div>
            <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={client_sitekey!} onChange={setCaptcha}/>
            <button className={`py-2 rounded-lg shadow-lg hover:brightness-[.97] ease-in-out transition-all duration-300 max-w-[300px] min-w-[300px] w-[300px] ${validForm ? 'pointer-events-auto cursor-pointer bg-green-300' : 'pointer-events-none bg-gray-50 opacity-50 '}`} type="submit">
              {!loading ? (<p className='cursor-pointer text-dark'>Book</p>) : (<Loading type={'text'}/>)}
            </button>
          </div>
        </div>
      </form>
    </section>
    <section>
      <div className='rounded-[40px] bg-slate-300 flex  max-[1000px]:flex-col  justify-between p-8 min-[700px]:px-16 min-[700px]:py-12 w-full gap-8'>
        <div className="cancelAppointmentText flex flex-col justify-between flex-grow-1 gap-8 w-[40%]">
          <h2>Cancel Appointment</h2>
          <p>You can cancel up to 48 hours before your appointment. Just fill in the form.</p>
        </div>
        <form className='flex flex-col items-start min-[1001px]:w-[60%] w-full' onSubmit={submitCancel}>
        <div className="tab">
          <div className="flex flex-col w-full gap-2">
          <div className="req"><input type="text" id="id" name="id" className={`input-field border-b-2 border-opacity-50
                               ${formDataValidCancel['id'] ? 'border-green-300' : null}
                               ${!formDataValidCancel!['id'] ? 'border-red-300' : null}
                               ${formDataCancel.id.length == 0 ? 'border-neutral' : null}`}  required placeholder='Appointment ID' onChange={handleInputFieldChangeCancel} value={formDataCancel.id} /></div>
          <div className="req"><input type="email" id="email" name="email" className={`input-field border-b-2 border-opacity-50
                               ${formDataValidCancel['email'] ? 'border-green-300' : null}
                               ${!formDataValidCancel!['email'] ? 'border-red-300' : null}
                               ${formDataCancel.email.length == 0 ? 'border-neutral' : null}`}  required placeholder='E-Mail' onChange={handleInputFieldChangeCancel} value={formDataCancel.email} /></div>
          <div className="input-wrapper-2">
            <div className="req"><input type="text" id="name" name="name" className={`input-field border-b-2 border-opacity-50
                               ${formDataValidCancel['name'] ? 'border-green-300' : null}
                               ${!formDataValidCancel!['name'] ? 'border-red-300' : null}
                               ${formDataCancel.name.length == 0 ? 'border-neutral' : null}`}  required placeholder='Name' onChange={handleInputFieldChangeCancel} value={formDataCancel.name}/></div>
            <div className="req"><input type="text" id="surname" name="surname" className={`input-field border-b-2 border-opacity-50
                               ${formDataValidCancel['surname'] ? 'border-green-300' : null}
                               ${!formDataValidCancel!['surname'] ? 'border-red-300' : null}
                               ${formDataCancel.surname.length == 0 ? 'border-neutral' : null}`}  required placeholder='Surname' onChange={handleInputFieldChangeCancel} value={formDataCancel.surname}/></div>
            </div>
          </div>
          </div>
          <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={client_sitekey!} onChange={setCaptcha}/>
          <button className={`py-2 w-[30%] mx-8 rounded-lg shadow-lg hover:brightness-[.97] ease-in-out transition-all duration-300 ${validFormCancel ? 'pointer-events-auto cursor-pointer bg-red-300' : 'pointer-events-none bg-gray-50 opacity-50 '}`} type="submit">
              {!loading ? (<p className='cursor-pointer text-dark min-w-0'>Cancel</p>) : (<Loading type={'text'}/>)}
          </button>
        </form>
      </div>
    </section>
    <Modal msg='Your Appointment has been created successfully. Thank You!' type={1} show={success} />
    <Modal msg='An error occured. Please try again!' type={-1} show={error} />
    <Modal msg='The zip code is not within our reach' type={-1} show={error_zip} />
    <Modal msg='No appointment found. Please try again our contact us!' type={-1} show={error3} />
    <Modal msg='You canceled your appointment successfully.' type={1} show={success2} />
  </>
  );
};

export default Appointment;