import { NextApiRequest, NextApiResponse } from "next";
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

type CookieObject = {
    [key: string]: string;
  };

export async function deleteOldData() {
    const sql = neon(process.env.DATABASE_URL!);

    const data = await sql`
        DELETE FROM consent_log
        WHERE timestamp::timestamp < NOW() - INTERVAL '1 year'
        RETURNING *;
    `;

    return data;
}

export async function postData(ip_value:string, consent_value:string) {
    const timestamp_value = new Date().toISOString();
    const data = await sql`
        INSERT INTO consent_log (ip, consent, timestamp)
        VALUES (${ip_value}, ${consent_value}, ${timestamp_value})
        RETURNING *;
    `;

    return data;
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
            const deletion = await deleteOldData();
            if(functional && marketing) {
                res.setHeader('Set-Cookie', 'CookieConsent=All; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax');
                const data = await postData(ip, "All");
            } else {
                if(functional) { 
                    res.setHeader('Set-Cookie', 'CookieConsent=Functional; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax');
                    const data = await postData(ip, "Functional");
                } else if(marketing) {
                    res.setHeader('Set-Cookie', 'CookieConsent=Marketing; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax'); 
                    const data = await postData(ip, "Marketing");
                } else {
                    res.setHeader('Set-Cookie', 'CookieConsent=Necessary; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax'); 
                    const data = await postData(ip, "Necessary");
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