import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function getPercentage(id: string) {
  const result = await sql`
    SELECT percentage
    FROM discounts
    WHERE id = ${id};
  `;
  
  return result[0]?.percentage ?? null;
}

function validate({disc} : {disc: string}): boolean {
  return regex.test(disc);
}

const regex = /^[A-Za-z0-9[-]{10,}$/; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { disc } = body;

  if (method === "POST") {
    if (!disc || !validate({disc:disc})) {
      return res.status(425).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
        const percentage = await getPercentage(disc);
        
        if (percentage === null) {
          return res.status(422).json({ message: "Invalid discount" });
      }

        return res.status(200).json({
            message: "valid discount",
            percentage: percentage,
          });

    } catch (error) {
      return res.status(422).json({ message: "invalid discount" });
    }
  }

  return res.status(404).send("something went wrong");
}