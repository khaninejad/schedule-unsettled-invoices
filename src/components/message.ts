export class Message {
  email: string;
  text: string;
  scheduled_in_second: number;
  paid: boolean;

  constructor(
    email: string,
    text: string,
    scheduled_in_second: number,
    paid: false
  ) {
    this.email = email;
    this.text = text;
    this.scheduled_in_second = scheduled_in_second;
    this.paid = paid;
  }
}
