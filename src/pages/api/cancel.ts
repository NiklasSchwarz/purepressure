import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';
import { send } from './send';
import { verifyCaptcha } from './captcha';

const sql = neon(process.env.DATABASE_URL!);

export async function deleteAppointment(id_value:string) {
    const data = await sql`
        DELETE FROM appointments
        WHERE id = ${id_value}
        RETURNING *;
    `;

    return data;
}

export async function sendMail(email:string, name_space:string, surname:string, name:string, id:string) {
  const subject = 'Appointment canceled'
  const msg_plain_user = 'Dear ' + name_space + surname + ' your appointment was successfully canceled ';
  const msg_html_user = '<h3>Appointment canceled</h3><p>Dear ' + name_space + surname + ' your Appointment was successfully canceled</p>';
  const msg_plain_admin = name_space + surname + ' canceled his appointment: ' + id;
  const msg_html_admin = '<h3>Appointment canceled:</h3><p>' + name_space + surname + 'canceled his Appointment: ' + id + '</p>';

  try {
    await send(email, msg_plain_user, msg_html_user, subject);
    await send(emailToSend, msg_plain_admin, msg_html_admin, subject);

  } catch (error) {
    throw error;
  }
}

function validateInput({email, surname, id, name} : {email: string, surname: string, id: string, name: string}): boolean {
  var valid_buffer = false;
  valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && uuidRegex.test(id) && nameRegex.test(name);
  return valid_buffer;
}

const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailToSend = process.env.EMAIL_TO!;
const uuidRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s'-.]{36,}$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, captcha, id, surname, name} = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!email || !id || !surname || !name) {
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
      const captchaValidation = await verifyCaptcha(captcha);

      if (!captchaValidation.success) {
          return res.status(400).json({
              message: 'Captcha validation failed',
              errors: captchaValidation['error-codes'],
          });
      }
      await sql`BEGIN`
      const data = await deleteAppointment(id);
      if (!data.length) {
        throw Error;
      }

      await sendMail(email, name, surname, name_space, id);
      await sql`COMMIT`;
      return res.status(200).send("OK");

    } catch (error) {
      await sql`ROLLBACK`;
      return res.status(422).json({ message: "Something went wrong" });
    }
  }

  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}