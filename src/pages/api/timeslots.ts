import { NextApiRequest, NextApiResponse } from 'next';
import {neon} from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function getTimeslots(date: string): Promise<Appointment[]> {
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

function isDateToday(date: string): boolean {
  const today = new Date();
  const [day, month, year] = date.split('-').map(Number);

  const inputDate = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
  return today.toDateString() === inputDate.toDateString();
}

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

          // Check if the date is today (in DD-MM-YYYY format)
        const isToday = isDateToday(date);

        // Get the current time
        const currentTime = new Date();

          // Function to convert time in "h:mm AM/PM" format to a Date object for comparison
        const convertToDate = (time: string): Date => {
          const [timePart, period] = time.split(' ');
          const [hour, minute] = timePart.split(':').map(Number);
          const adjustedHour = period === 'PM' && hour !== 12 ? hour + 12 : hour;
          const adjustedMinute = period === 'AM' && hour === 12 ? 0 : minute;

          const result = new Date();
          result.setHours(adjustedHour, adjustedMinute, 0, 0); // Set time to the hour and minute
          return result;
        };

        // Filter out timeslots if they are less than 2 hours from now
        const remainingTimeslots = availableTimeslots.filter((timeslot) => {
          // If it's not today, don't filter based on time
          if (!isToday) {
            return !timeslotList.includes(timeslot);  // Exclude already booked timeslots
          }

          const timeslotDate = convertToDate(timeslot);

          // Filter out timeslots that are less than 2 hours away from now
          return !timeslotList.includes(timeslot) && (timeslotDate.getTime() - currentTime.getTime() > 2 * 60 * 60 * 1000);
        });


       
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