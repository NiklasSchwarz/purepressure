"use client"
import './booking.css'
import { Calendar } from "@/components/ui/calendar"
import { useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import Modal from '@/components/ux/Modal/Modal';
import Head from '@/components/ux/Head/Head';
import { ReactElement, JSXElementConstructor, ReactNode, Key } from 'react';

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
  gold: { small: 40, medium: 45, large: 49 },
  platinum: { small: 65, medium: 70, large: 75 },
  showroom: { small: 100, medium: 120, large: 140 },
  trash: { month: 9, once: 39, default: 15 },
};

function getPrice(service: string, specs: string, multiplier: number): number {
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

function validateInput(email: string, name: string, surname: string, zip: string, nr: string, street: string, state: string): Record<string, boolean> {
  return {
    'email': emailRegex.test(email),
    'name': nameRegex.test(name),
    'surname': nameRegex.test(surname),
    'street': nameRegex.test(street),
    'state': nameRegex.test(state),
    'zip': zipReg.test(zip),
    'nr': nrReg.test(nr)
  }
}

const nrReg = /^[A-Za-z0-9]{1,}$/; 
const zipReg = /^[0-9]{5}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', zip: '', nr:'', street:'', state:'', externalWash: false});
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
  const [selTimeslot, setSelTimeslot] = useState<string>()
  const [loadTimeslots, setLoadTimeslots] = useState(false)
  const [formDataValid, setFormDataValid] = useState<Record<string, boolean>>({})
  const [validForm, setValidForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [error_zip, setErrorZip] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    setPrice(getPrice(service, specs, multiplierZip))
  }, [multiplierZip, service, specs]); 

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
    if (error || success || error_zip) {
      const timer = setTimeout(() => {
        setError(false); // Reset to null after 2 seconds
        setSuccess(false);
        setErrorZip(false);
      }, 2000);

      // Cleanup the timer when component unmounts or `error` changes
      return () => clearTimeout(timer);
    }
  }, [error, success, error_zip]);
  
  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

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
        updatedFormData.state    );
    setFormDataValid(bufferValidation);

    let trash_zip_relation = true;
    if (e.target.name != "service" && e.target.value == "trash" ) {
      if (!updatedFormData.externalWash) {
        trash_zip_relation = false;
      }
    }
    setValidForm(Object.values(bufferValidation).every((isValid) => isValid === true) && trash_zip_relation);
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
    if (formDataValid['zip']) {
      try {
        const multiplier = await getZipCodeMoltiplier(formData.zip); 
        if (multiplier) {
          setMultiplier(multiplier)
          if(service == "trash") {
            setFormData((prevData) => ({
              ...prevData,
              externalWash: true,
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
          externalWash: false,
        }));
        setErrorZip(true);
        setMultiplier(1);
      }
    }
  }

  useEffect(()=> {
    if(formData.externalWash || formData) {
      handleZipCode();
    }
  }, [formData.externalWash, formData.zip]);

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
        externalWash: true,
      }));
      setSpecs("month")
    } else if (event.target.value != "trash" && selTrash) {
      setFormData((prevData) => ({
        ...prevData,
        externalWash: false,
      }));
      setSelTrash(false)
      setSpecs("small")
    }
  }

  const handleSpecs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecs(event.target.value)
  }

   const submit = async (event: React.FormEvent) => {
   }
  return (
    <>
    <section>
    <Head imageSrc={'/images/white_chev.jpeg'} imageAlt={'Header Iimg'} heading={'Booking'} subtitle={'Manage your Appointments'} text={'Here you can make an appointment with me, get a cost estimate or cancel your appointment'} btn={false}></Head>
    </section>
    <section className='text-left justify-start items-start'>
      <h2 className='p-8'>Book an appointment</h2>
      <form  className="appointment-form-container" onSubmit={submit}>
        <div className="tab">
          <h4>Select a service:</h4>
          <div className="services">
          {["bronze", "silver", "gold", "platinum", "showroom", "trash"].map((item) => (
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
          <div className='grid grid-cols-1 min-[900px]:grid-cols-[400px_200px] min-[1200px]:grid-cols-[600px_200px] gap-4'>
            <div className="input-wrapper w-full">
              <div className="req"><input type="text" id="street" name="street" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['street'] ? 'border-green-300' : null}
                               ${!formDataValid!['street'] ? 'border-red-300' : null}
                               ${formData.street.length == 0 ? 'border-neutral' : null}`}  required placeholder='Street name' onChange={handleInputFieldChange} value={formData.street}/> </div>
              <div className="req"><input type="text" id="nr" name="nr" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['nr'] ? 'border-green-300' : null}
                               ${!formDataValid!['nr'] ? 'border-red-300' : null}
                               ${formData.nr.length == 0 ? 'border-neutral' : null}`}  required placeholder='Nr.' onChange={handleInputFieldChange} value={formData.nr}/></div>
              <div className="req"><input type="text" id="state" name="state" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['state'] ? 'border-green-300' : null}
                               ${!formDataValid!['state'] ? 'border-red-300' : null}
                               ${formData.state.length == 0 ? 'border-neutral' : null}`}  required placeholder='State' onChange={handleInputFieldChange} value={formData.state} /></div>
              <div className="req"><input type="text" id="zip" name="zip" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['zip'] ? 'border-green-300' : null}
                               ${!formDataValid!['zip'] ? 'border-red-300' : null}
                               ${formData.zip.length == 0 ? 'border-neutral' : null}`}  required placeholder='ZIP-Code' onChange={handleInputFieldChange} value={formData.zip} /></div>
            </div>
            <label className={`${formData.externalWash ? "bg-green-300" : "bg-gray-50"} ${(selTrash && formData.externalWash) || error_zip ? "pointer-events-none opacity-50" : "cursor-pointer"} p-8 rounded-lg shadow-lg hover:brightness-[.97] transition-all flex gap-2 items-center`}>
              <input name="externalWash" checked={formData.externalWash} onChange={handleInputFieldChange} type='checkbox'/>
              <p className='font-medium text-dark cursor-pointer text-wrap'>clean there *</p>
            </label>
            <p>* A transportation fee is added, if you want to get your car washed at your place. Trash Cans can only be cleaned externally.</p>
          </div>
        </div>
        <div className="tab">
          <h4>Personal data:</h4>
          <div className="flex flex-col w-full gap-2 max-w-[608px]">
          <div className="req"><input type="email" id="email" name="email" className={`input-field border-b-2 border-opacity-50
                               ${formDataValid['email'] ? 'border-green-300' : null}
                               ${!formDataValid!['email'] ? 'border-red-300' : null}
                               ${formData.email.length == 0 ? 'border-neutral' : null}`}  required placeholder='E-Mail' onChange={handleInputFieldChange} value={formData.email} /></div>
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
            <button className={`py-2 rounded-lg shadow-lg hover:brightness-[.97] ease-in-out transition-all duration-300 ${validForm ? 'pointer-events-auto cursor-pointer bg-green-300' : 'pointer-events-none bg-gray-50 opacity-50 '}`} type="submit">
              {!loading ? (<p className='cursor-pointer text-dark min-w-0'>Book</p>) : (<Loading type={'text'}/>)}
            </button>
          </div>
        </div>
      </form>
      <Modal msg='Your Appointment has been created successfully. Thank You!' type={1} show={success} />
      <Modal msg='An error occured. Please try again!' type={-1} show={error} />
      <Modal msg='The zip code is not within our reach' type={-1} show={error_zip} />
    </section>
  </>
  );
};

export default Appointment;