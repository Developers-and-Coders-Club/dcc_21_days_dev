# date_difference.py
import sys
from datetime import datetime
import pytz

def calculate_days_difference(given_year, given_month, given_day, timezone='UTC'):
    given_date = pytz.timezone(timezone).localize(datetime(given_year, given_month, given_day))
    current_date = datetime.now(pytz.timezone(timezone))
    date_difference = current_date - given_date
    return date_difference.days + 1

if __name__ == "__main__":
    # Parse command line arguments
    given_year = int(sys.argv[1])
    given_month = int(sys.argv[2])
    given_day = int(sys.argv[3])
    timezone = sys.argv[4] if len(sys.argv) > 4 else 'UTC'

    # Calculate the difference and print the result
    difference_in_days = calculate_days_difference(given_year, given_month, given_day, timezone)
    print(difference_in_days)
