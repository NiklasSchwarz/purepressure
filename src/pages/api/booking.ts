import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';
import { send } from './send';
import { verifyCaptcha } from './captcha';
import { randomUUID } from 'crypto';

export async function selectAppointment(id_value:string) {
    const sql1 = neon(process.env.DATABASE_URL!);
    const data = await sql1`
        SELECT * FROM appointments
        WHERE id = ${id_value};
    `;

    return data;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Convert to the desired format (DD-MM-YYYY)
    const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

export async function sendMail(id:string, email:string, name:string, surname:string, zip:string, nr:string, street:string, state:string, phone:string, timeslot:string, date:string, price:string, internalWash:boolean, service:string, specs:string) {
  const address = street + ' ' + nr + ', ' + zip + ' ' + state
  const full_name = name + ' ' + surname
  const subject = 'Appointment booked'
  let msg_plain_user = 'Dear ' + full_name + ' your appointment for a ' + service + ' car detailing(' + specs + ') was successfully booked. Your total costs are: $' + price + '. Appointment at:' + date + ', ' + timeslot +  '. Please deliver the Car 10 minuts before your appointment at the Pure Pressure Location 47-172 Waiohia Place, 96744 Kaneohe.';
  let msg_html_user = '<p>Dear ' + full_name + ' your appointment for a ' + service + ' car detailing(' + specs + ') was successfully booked.</p><p> Your total costs are: $' + price + '. Appointment at:' + date + ', ' + timeslot +  '. Please deliver the Car 10 minuts before your appointment at the Pure Pressure Location 47-172 Waiohia Place, 96744 Kaneohe.</p>';
  let msg_plain_admin = full_name + ' booked his appointment: ' + id + '. Appointment at:' + date + ', ' + timeslot +  '. Washing at location: Pure Pressure. Service:' + service + '(' + specs + '). Costs: $' + price + '. Customer details: ' + email + ', ' + phone + ', ' + address;
  let msg_html_admin = '<h3>Appointment booked:</h3><p>' + full_name + ' booked his appointment: ' + id + '.</p><p>Appointment at:' + date + ', ' + timeslot +  '.</p><p>Washing at location: Pure Pressure.</p><p>Service:' + service + '(' + specs + ').</p><p>Costs: $' + price + '.</p><p>Customer details:</p><p>' + email + ',</p><p>' + phone + ',</p><p>' + address + '</p>';
  if (internalWash == false) {
    msg_plain_user = 'Dear ' + full_name + ' your appointment for a ' + service + ' car detailing(' + specs + ') was successfully booked. Your total costs are: $' + price + '. Appointment at:' + date + ', ' + timeslot +  '. The car detailing takes place at your address. Please provide easy access to water and electricity.';
    msg_html_user = '<p>Dear ' + full_name + ' your appointment for a ' + service + ' car detailing(' + specs + ') was successfully booked.</p><p> Your total costs are: $' + price + '. Appointment at:' + date + ', ' + timeslot +  '. The car detailing takes place at your address. Please provide easy access to water and electricity.</p>';
    msg_plain_admin = full_name + ' booked his appointment: ' + id + '. Appointment at:' + date + ', ' + timeslot +  '. Washing at location: ' + address +' Service:' + service + '(' + specs + '). Costs: $' + price + '. Customer details: ' + email + ', ' + phone + ', ' + address;
    msg_html_admin = '<h3>Appointment booked:</h3><p>' + full_name + ' booked his appointment: ' + id + '.</p><p>Appointment at:' + date + ', ' + timeslot +  '.</p><p>Washing at location: ' + address +' </p><p>Service:' + service + '(' + specs + ').</p><p>Costs: $' + price + '.</p><p>Customer details:</p><p>' + email + ',</p><p>' + phone + ',</p><p>' + address + '</p>';
  }

  try {
    await send(email, msg_plain_user, msg_html_user, subject);
    await send(emailToSend, msg_plain_admin, msg_html_admin, subject);

  } catch (error) {
    throw error;
  }
}

function validateInput(email: string, name: string, surname: string, zip: string, nr: string, street: string, state: string, phone:string): boolean {
    var valid_buffer = false;
    valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && zipReg.test(zip) && nrReg.test(nr) && phoneRegex.test(phone) && nameRegex.test(street) && nameRegex.test(state) && nameRegex.test(name);
    return valid_buffer;
  }

const phoneRegex = /^\+?[1-9]\d{1,14}$|^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const nrReg = /^[A-Za-z0-9]{1,}$/; 
const zipReg = /^[0-9]{5}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailToSend = process.env.EMAIL_TO!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, captcha, name, surname, zip, nr, street, state, phone, timeslot, date, price, internalWash, service, specs } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!email || !captcha || !name || !surname || !zip || !nr || !street || !state || !phone  || !surname) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    if (!validateInput(email, name, surname, zip, nr, street, state, phone)) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
      const captchaValidation = await verifyCaptcha(captcha);

      if (!captchaValidation.success) {
          return res.status(400).json({
              message: 'Captcha validation failed',
              errors: captchaValidation['error-codes'],
          });
      }

      let id = randomUUID();
      let data = await selectAppointment(id);

      while(data.length) {
        id = randomUUID();
        data = await selectAppointment(id);
      }
      const sql = neon(process.env.DATABASE_URL!);
      await sql`BEGIN`;

        try {
            const formated_date = formatDate(date)
            // Create appointment and send emails within the transaction scope
            const address = street + ' ' + nr + ', ' + zip + ' ' + state
            const full_name = name + ' ' + surname
            await sendMail(id, email, name, surname, zip, nr, street, state, phone, timeslot, formated_date, price, internalWash, service, specs);
            
            const data = await sql`
                INSERT INTO appointments (
                    id, phone, email, date, service, timeslot, address, name, internal, price, specs
                )
                VALUES (
                    ${id}, ${phone}, ${email}, ${formated_date}, ${service}, ${timeslot}, ${address}, ${full_name}, ${internalWash}, ${price}, ${specs}
                )
                RETURNING *;
            `;

            // Commit the transaction after success
            await sql`COMMIT`;

            return res.status(200).send("Appointment created successfully");

        } catch (error) {
            // Rollback if anything fails inside the try block
            await sql`ROLLBACK`;
            console.error('Transaction error:', error);
            return res.status(422).json({ message: "Something went wrong during the transaction." });
        }

    } catch (error) {
      return res.status(422).json({ message: "Something went wrong" });
    }
  }

  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}