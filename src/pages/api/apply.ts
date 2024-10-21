import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable'; 
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { Resend } from 'resend';

// Validation function
function validateInput({ email, surname, name, file}: { email: string; surname: string; name: string; file: any;}): boolean {
  const valid_buffer = emailRegex.test(email) && nameRegex.test(surname) && nameRegex.test(name);

  // Formidable file validation - check file mimetype and size
  if (file.mimetype !== 'application/pdf' || file.size > 40 * 1024 * 1024) {
    return false;
  }

  return valid_buffer;
}

// Regexes for validation
const messageRegex = /^[A-Za-z0-9À-ÖØ-ÿ\s.,?!@#$%^&*()_:~[\]|\\\/]{10,}$/; 
const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ\s'-.]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

// Disable Next.js body parsing, since formidable will handle the form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "POST") {
    const form = new IncomingForm({
      multiples: false, // Disable multiple file uploads
      keepExtensions: true, // Keep file extension (optional)
    });

    try {
      // Parse the incoming form-data
      form.parse(req, async (err: any, fields: Fields, files: Files) => {
        if (err) {
          return res.status(500).json({ message: 'Error parsing form data', error: err.message });
        }

        // Safely extract form fields and ensure they are strings
        const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const surname = Array.isArray(fields.surname) ? fields.surname[0] : fields.surname;
        const job = Array.isArray(fields.job) ? fields.job[0] : fields.job;
        const captcha = Array.isArray(fields.captcha) ? fields.captcha[0] : fields.captcha;
        
        // Handle the file: check if it's an array and get the first element if it is
        let file: formidable.File | undefined;
        if (Array.isArray(files.file)) {
          file = files.file[0]; // Take the first file if multiple were uploaded
        } else {
          file = files.file as formidable.File | undefined; // If it's not an array, use it directly
        }
        // Check for required fields
        if (!email || !captcha || !name || !surname || !file || !job) {
          return res.status(423).json({
            message: "Unprocessable request, please provide the required fields",
          });
        }

        // Validate input
        if (!validateInput({ email, name, surname, file })) {
          return res.status(422).json({
            message: "Unprocessable request, invalid input",
          });
        }

        try {
          // Verify the captcha with Google
          const captchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
              },
              method: "POST",
            }
          );

          const captchaValidation = await captchaResponse.json();
          if (!captchaValidation.success) {
            return res.status(422).json({ message: "Invalid captcha code" });
          }

          // Prepare file for email sending
          const attachments: {
            filename: string; // Ensure this is a string
            content: string; // Base64 content
            contentType: string; // Ensure this is a string
          }[] = [];

          // Ensure file is defined and has the required properties
          if (file && file.originalFilename && file.filepath && file.mimetype) {
            attachments.push({
              filename: file.originalFilename, // Use the original filename
              content: fs.readFileSync(file.filepath).toString('base64'), // Convert file to base64 string
              contentType: file.mimetype, // Use the MIME type of the file
            });
          } else {
            return res.status(400).json({ message: "File properties are missing" });
          }

          // Send the email
          const mailState = await resend.emails.send({
            from: 'Bewerbung <onboarding@resend.dev>',
            to: ['niklas.schwarz1@yahoo.de'],
            subject: 'Bewerbung über Formular',
            attachments: attachments, // Pass attachments here
            html: `<h2>Bewerbung: ${job}</h2><p>Von: ${name} ${surname}</p><p>E-Mail: ${email}</p><p>Hat Ihnen eine Bewerbung gesendet.</p>`,
            text: `Bewerbung von ${name} ${surname} mit der E-Mail ${email} hat Ihnen eine Bewerbung gesendet.`,
          });

          if (mailState.error) {
            return res.status(403).json({ message: "Mail Error" });
          }

          return res.status(200).json({ message: "OK" });

        } catch (err) {
          return res.status(500).json("Error during mail or captcha validation");
        }
      });
    } catch (error) {
      return res.status(500).json("Form parsing failed");
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
