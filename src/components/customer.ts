export class Customer {
  email: string;
  text: string;
  schedule: number[];

  constructor(email: string, text: string, schedule: string) {
    this.email = email;
    this.text = text;
    this.schedule = schedule.split('-').map(s => parseInt(s.slice(0, -1)));
  }
}
