import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function getTimeslots(date: string): Promise<Appointment[]> {
  const sql = neon(process.env.DATABASE_URL!);
  const result = await sql`
    SELECT date, timeslot
    FROM appointments
    WHERE date = ${date};
  `;
  
  // Type cast the result to Appointment[]
  return result as Appointment[];
}

type Appointment = {
  date: string;
  timeslot: string;
};

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
        const data: Appointment[] = await getTimeslots(date);

        const appointments = data.filter((entry: { date: string; timeslot: string }) => entry.date === date);

        // Extract the list of timeslots from the appointments
        const timeslotList = appointments.length > 0
          ? appointments.map((entry: { timeslot: string }) => entry.timeslot)
          : [];

        // Define all available timeslots
        const availableTimeslots = [
          "8:00 AM",
          "9:30 AM",
          "11:00 AM",
          "12:30 PM",
          "2:00 PM",
          "3:30 PM",
          "5:00 PM",
          "6:30 PM",
        ];

        // Calculate the remaining timeslots
        const remainingTimeslots = availableTimeslots.filter(
          (timeslot) => !timeslotList.includes(timeslot)
        );

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