import {ICustomer} from '../interfaces/ICustomer.interface';

export class Customer implements ICustomer {
  email: string;
  text: string;
  schedule: number[] = [];

  constructor(email: string, text: string, schedule: string) {
    this.email = email;
    this.text = text;

    this.setSchedule(schedule);
  }

  setSchedule(schedule: string) {
    if (!/^(\d+s)(-(\d+s))*$/.test(schedule)) {
      throw new Error(`Invalid schedule format: "${schedule}"`);
    } else {
      this.schedule = schedule.split('-').map(s => parseInt(s.slice(0, -1)));
    }
  }
}
