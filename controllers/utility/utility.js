// async Function to get local time in a specific time zone
function getLocalTime(timezone) {
  const options = { timeZone: timezone };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const localTime = new Date(formatter.format(new Date()));
  return localTime;
}

// async Function to calculate the difference in days between two dates
function calculateDaysDifference(date1, date2) {
  const timeDifference = date1.getTime() - date2.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.floor(daysDifference);
}

async function getDayNumber(req, resp) {
  // Set the target date (5 Nov 2023 12:00 AM in Asia/Kolkata)
  const targetDate = new Date('2023-12-05T00:00:00Z');
  targetDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  // Get the current local time in Asia/Kolkata
  const currentTimeInAsiaKolkata = getLocalTime('Asia/Kolkata');

  // Calculate the difference in days
  const daysDifference = calculateDaysDifference(
    currentTimeInAsiaKolkata,
    targetDate
  );

  return resp.status(200).json({ dayNo: daysDifference + 1 }); // change required
  // return daysDifference + 1; // change required
}

const utility = { getDayNumber, getLocalTime, calculateDaysDifference };

export default utility;
