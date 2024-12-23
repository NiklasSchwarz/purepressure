import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function deleteAppointment(id_value:string) {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`BEGIN`
    const data = await sql`
        DELETE FROM appointments
        WHERE id = ${id_value}
        RETURNING *;
    `;

    return data;
}

function validateInput({email, surname, id, name} : {email: string, surname: string, id: string, name: string}): boolean {
  var valid_buffer = false;
  valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && uuidRegex.test(id) && nameRegex.test(name);
  return valid_buffer;
}

const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const emailToSend = process.env.EMAIL_TO!;
const uuidRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s'-.]{36,}$/;

const resend = new Resend(process.env.RESEND_API_KEY);

interface Appointment {
    email: string;
    date: string;
    service: string;
    timeslot: string;
    id: string;
    address: string;
    name: string;
    extern: boolean
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, captcha, id, surname, name} = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!email || !captcha || !id || !surname || !name) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    if (!validateInput({email:email, name:name, id:id, surname:surname})) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    var name_space = ' ';
    if (name) {
      name_space += name + ' ';
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );

      const captchaValidation = await response.json();
      if (captchaValidation.success) {
        const data = await deleteAppointment(id);
        if (!data.length) {
          return res.status(422).json({
            message: "No appointment was found"});
        }
          try {
            const mailState = await resend.emails.send({
              from: 'Pure Pressure Hawaii <onboarding@resend.dev>',
              to: [email],
              subject: 'Appointment canceled',
              html: '<h3>Appointment canceled</h3><p>Dear ' + name_space + surname + ' your Appointment was successfully canceled</p>',
              text: 'Dear ' + name_space + surname + ' your appointment was successfully canceled ',
            });
            const mailState2 = await resend.emails.send({
                from: 'Pure Pressure Hawaii <onboarding@resend.dev>',
                to: [emailToSend],
                subject: 'Appointment canceled',
                html: '<h3>Appointment canceled:</h3><p>' + name_space + surname + 'canceled his Appointment:' + id,
                text: name_space + surname + ' canceled his appointment' + id,
              });
            if (mailState.error || mailState2.error) {
              await sql`ROLLBACK`;
              return res.status(403).send("Mail Error");
            }
            await sql`COMMIT`;
            return res.status(200).send("OK");
            
          } catch (error) {
            await sql`ROLLBACK`;
            return res.status(403).json({message: "Mail Error"});
          }
      }
      await sql`ROLLBACK`;
      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code"});
    } catch (error) {
      await sql`ROLLBACK`;
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}