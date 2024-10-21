import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

function validateInput({email, surname, msg, name, companyName} : {email: string, surname: string, msg: string, name?: string, companyName?: string}): boolean {
  var valid_buffer = false;
  valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && messageRegex.test(msg);

  if (name) {
    valid_buffer = valid_buffer && (nameRegex.test(name) || name.length == 0);
  }
  if (companyName) {
    valid_buffer = valid_buffer && (nameRegex.test(companyName) || companyName.length == 0);
  }
  return valid_buffer;
}

const messageRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{10,}$/; 
const compRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{3,}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { email, captcha, msg, surname, name, companyName} = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!email || !captcha || !msg || !surname) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    if (!validateInput({email:email, name:name, msg:msg, surname:surname, companyName:companyName})) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    var name_space = ' ';
    if (name) {
      name_space += name + ' ';
    }

    var company_space = '?';
    if (companyName) {
      company_space = companyName;
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
          try {
            const mailState = await resend.emails.send({
              from: 'Kontaktanfrage <onboarding@resend.dev>',
              to: ['niklas.schwarz1@yahoo.de'],
              subject: 'Kontaktformular Homepage',
              html: '<h2>Anfrage Kontaktformular:</h2><p>Von:</p>' + name_space + surname + '</p><p>E-Mail: ' + email + '</p><p>Unternehmen: ' + company_space + '</p><p>Nachricht: ' + msg + '</p>',
              text: 'Anfrage Kontaktformular von' + name_space + surname + ' mit der E-Mail: '+ email + ' und dem Unternehmen: ' + company_space + ' Nachricht: ' + msg,
            });
            if (mailState.error) {
              return res.status(403).send("Mail Error");
            }
            return res.status(200).send("OK");
            
          } catch (error) {
            return res.status(403).json({message: "Mail Error"});
          }
      }
      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code"});
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}