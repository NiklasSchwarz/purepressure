import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

function validate({date} : {date: string}): boolean {
  return regex.test(date);
}

const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const { date } = body;
  if (method === "POST") {
    if (!date || !validate({date:date})) {
      return res.status(425).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
        const file = await fs.readFile(process.cwd() + '/data/appointments.json', 'utf8');
        const data = JSON.parse(file);

        const appointments = data.filter((entry: { date: string, timeslot: string }) => entry.date === date);

        const timeslotList = appointments.length > 0 ? appointments.map((entry: { timeslot: string }) => entry.timeslot) : [];
        const availableTimeslots = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];

        const remainingTimeslots = availableTimeslots.filter(timeslot => !timeslotList.includes(timeslot));

        return res.status(200).json({
            message: "valid timeslot",
            timeslots: remainingTimeslots,
          });

    } catch (error) {
      return res.status(422).json({ message: "invalid date" });
    }
  }

  return res.status(404).send("something went wrong");
}