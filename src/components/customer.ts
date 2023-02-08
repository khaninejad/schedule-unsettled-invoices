import {ICustomer} from '../interfaces/ICustomer.interface';
/**
 * this class is responsible to create an instance of customers with their scheduled reminders.
 * @implements {ICustomer}
 */
export class Customer implements ICustomer {
  email: string;
  text: string;
  schedule: number[] = [];

  constructor(email: string, text: string, schedule: string) {
    this.email = email;
    this.text = text;

    this.setSchedule(schedule);
  }
  /**
   * this method is responsible to check if a schedule has a valid format or not eg: 1s-10s
   * improvement: ideally we could have a validator class with validation schema in a separate class
   */
  setSchedule(schedule: string) {
    if (!/^(\d+s)(-(\d+s))*$/.test(schedule)) {
      throw new Error(`Invalid schedule format: "${schedule}"`);
    } else {
      // this line will parse string septate string with - and slice separated string to extract numbers
      this.schedule = schedule.split('-').map(s => parseInt(s.slice(0, -1)));
    }
  }
}
