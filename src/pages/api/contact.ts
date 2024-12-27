import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCaptcha } from './captcha';
import { send } from './send';

function validateInput({email, surname, msg, name} : {email: string, surname: string, msg: string, name?: string}): boolean {
  var valid_buffer = false;
  valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && messageRegex.test(msg);

  if (name) {
    valid_buffer = valid_buffer && (nameRegex.test(name) || name.length == 0);
  }
  return valid_buffer;
}

const messageRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{10,}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailToSend = process.env.EMAIL_TO!;

export async function sendMail(email:string, name_space:string, surname:string, msg:string) {
  const subject = 'Contact'
  const msg_plain_user = 'Dear ' + name_space + surname + ' your contact request was successfully send.';
  const msg_html_user = '<h2>Contact request:</h2><p>Your contact request was successfully send.</p>';
  const msg_plain_admin = 'Contact request: From:' + name_space + surname + ' E-Mail: ' + email + ' Message: ' + msg;
  const msg_html_admin = '<h2>Contact request:</h2><p>From:</p>' + name_space + surname + '</p><p>E-Mail: ' + email + '</p><p>Message: ' + msg + '</p>';

  try {
    await send(email, msg_plain_user, msg_html_user, subject);
    await send(emailToSend, msg_plain_admin, msg_html_admin, subject);

  } catch (error) {
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, captcha, msg, surname, name} = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!email || !captcha || !msg || !surname) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    if (!validateInput({email:email, name:name, msg:msg, surname:surname})) {
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

      try {
        await sendMail(email, name_space, surname, msg);
        return res.status(200).json({ message: "Contact request sent successfully." });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return res.status(500).json({ message: "Failed to send email" });
      }

    } catch (error) {
      return res.status(423).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}