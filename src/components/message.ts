import {IMessage} from '../interfaces/IMessage.interface';
/**
 * this class is responsible to create a instance of messages for each reminders
 * @implements {IMessage}
 */
export class Message implements IMessage {
  email: string;
  text: string;
  scheduled_in_second: number;
  is_paid: boolean;

  constructor(
    email: string,
    text: string,
    scheduled_in_second: number,
    is_paid: boolean
  ) {
    this.email = email;
    this.text = text;
    this.scheduled_in_second = scheduled_in_second;
    this.is_paid = is_paid;
  }
}
