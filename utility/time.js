import { promisify } from 'util';
import { exec } from 'child_process';

const promisifiedExec = promisify(exec);

async function getDayNumber() {
  const givenYear = 2023;
  const givenMonth = 12;
  const givenDay = 5;
  const timezone = "Asia/Kolkata";

  const command = `python3 utility/time.py ${givenYear} ${givenMonth} ${givenDay} ${timezone}`;
  
  try {
    const { stdout } = await promisifiedExec(command);
    const differenceInDays = parseInt(stdout.trim(), 10);
    return differenceInDays;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 0;
  }
}

export default getDayNumber;
