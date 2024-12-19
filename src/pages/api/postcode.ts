import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

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
        const file = await fs.readFile(process.cwd() + '/data/postcodes.json', 'utf8');
        const postcodes = JSON.parse(file);

        const postcode_data = postcodes.find((entry: { postcode: string; multiplier: number }) => entry.postcode === postcode);
        if (!postcodes) res.status(423).json({ message: "invalid postcode" });

        return res.status(200).json({
            message: "valid postcode",
            multiplier: postcode_data.multiplier,
          });

    } catch (error) {
      return res.status(422).json({ message: "invalid postcode" });
    }
  }

  return res.status(404).send("something went wrong");
}