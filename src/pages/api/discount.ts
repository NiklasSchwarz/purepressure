import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

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
        const file = await fs.readFile(process.cwd() + '/data/discounts.json', 'utf8');
        const discounts = JSON.parse(file);

        const discount = discounts.find((entry: { id: string; percentage: number }) => entry.id === disc);
        
        if (!discounts) res.status(422).json({ message: "invalid discount" });

        return res.status(200).json({
            message: "valid discount",
            percentage: discount.percentage,
          });

    } catch (error) {
      return res.status(422).json({ message: "invalid discount" });
    }
  }

  return res.status(404).send("something went wrong");
}