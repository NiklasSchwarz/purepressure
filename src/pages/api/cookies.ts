import { NextApiRequest, NextApiResponse } from "next";

const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'data', 'consentLogs.json');

type CookieObject = {
    [key: string]: string;
  };

// Helper function to check if a date is older than 1 year
const isOlderThanOneYear = (timestamp: string) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return new Date(timestamp) < oneYearAgo;
};

// Function to save consent data to a JSON file
async function saveConsentData(ip: string, consent: string) {
  const consentData = {
    ip,
    consent,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check if the file exists
    let fileData = [];
    // Check if the file exists and is not empty
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        
        // Ensure fileData is an array before pushing new data
        try {
          fileData = JSON.parse(rawData);
          if (!Array.isArray(fileData)) {
            fileData = []; // If fileData is not an array, initialize it as an empty array
          }
        } catch (err) {
          fileData = []; // If parsing fails, initialize as empty array
        }
    }

    // Filter out data older than one year
    fileData = fileData.filter(entry => !isOlderThanOneYear(entry.timestamp));

    // Add the new consent data to the array
    fileData.push(consentData);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    
    console.log('Consent data saved successfully:', consentData);
  } catch (err) {
    throw err;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body, method } = req;
    const ip = (typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for'].split(',')[0]
        : Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.socket.remoteAddress) || '';
    
    // Handle local development for IPv6 loopback
    const realIp = ip === '::1' ? '127.0.0.1' : ip
  
    if (method === "POST") {
        // Extract the email and captcha code from the request body
        const { functional, marketing} = body;
        try {
            if(functional && marketing) {
                res.setHeader('Set-Cookie', 'CookieConsent=All; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax');
                saveConsentData(ip, "All");
            } else {
                if(functional) { 
                    res.setHeader('Set-Cookie', 'CookieConsent=Functional; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax');
                    saveConsentData(ip, "Functional");
                } else if(marketing) {
                    res.setHeader('Set-Cookie', 'CookieConsent=Marketing; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax'); 
                    saveConsentData(ip, "Marketing");
                } else {
                    res.setHeader('Set-Cookie', 'CookieConsent=Necessary; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax'); 
                    saveConsentData(ip, "Necessary");
                }
            }
            return res.status(200).send("Success");
        }
        catch (error) {
            return res.status(430).send("Error");
        }
    }

    if (method === "GET") {
        // Access the cookie string from the headers
        const cookieHeader = req.headers.cookie || '';

        // Function to parse cookies from the cookie string
        const parseCookies = (cookieString: string): CookieObject => {
        return cookieString
            .split('; ') // Split the cookie string into individual cookies
            .reduce((acc: CookieObject, cookie: string) => {
            const [key, value] = cookie.split('='); // Split each cookie into key-value pair
            acc[key] = value; // Add the key-value pair to the accumulator object
            return acc;
            }, {}); // Return the object containing all cookies
        };

        // Parse the cookies
        const cookies = parseCookies(cookieHeader);

        // Extract the CookieConsent value
        const consent = cookies.CookieConsent;

        // Check the value of CookieConsent and handle it
        switch (consent) {
            case 'All':
                return res.status(200).json({ functional: true, marketing: true });
            case 'Functional':
                return res.status(200).json({ functional: true, marketing: false });
            case 'Marketing':
                return res.status(200).json({ functional: false, marketing: true });
            case 'Necessary':
                return res.status(200).json({ functional: false, marketing: false });
            default:
                // If the consent cookie is not found or is invalid
                return res.status(430).json({ consent: 'No valid consent found.' });
        }
    }

    return res.status(440).send("Error");
  }