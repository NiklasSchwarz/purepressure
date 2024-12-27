import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function getPostcodes(postcode: string): Promise<Postcode> {
  const result = await sql`
    SELECT *
    FROM postcodes
    WHERE postcode = ${postcode}
    LIMIT 1;
  `;

  return result[0] as Postcode;
}

type Postcode = {
  postcode: string;
  multiplier: string;
};

function validate({postcode} : {postcode: string}): boolean {
  return regex.test(postcode);
}

const regex = /^[0-9]{5}$/; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { postcode } = body;

  if (method === "POST") {
    if (!postcode || !validate({postcode:postcode})) {
      return res.status(425).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    try {
        const data = await getPostcodes(postcode)
        if (!data) {
          return res.status(422).json({ message: "invalid postcode" });
        }
        return res.status(200).json({
            message: "valid postcode",
            multiplier: data.multiplier,
          });

    } catch (error) {
      return res.status(422).json({ message: "invalid postcode" });
    }
  }

  return res.status(404).send("something went wrong");
}