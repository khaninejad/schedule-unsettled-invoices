import {ICustomer} from '../interfaces/ICustomer.interface';
import {IMessageSender} from '../interfaces/IMessageSender.interface';

export class Schedule {
  customers: ICustomer[];
  private messageSender: IMessageSender;

  constructor(customers: ICustomer[], messageSender: IMessageSender) {
    this.customers = customers;
    this.messageSender = messageSender;
  }

  buildMessageQueue(): void {
    for (const customer of this.customers) {
      for (const offset of customer.schedule) {
        const message = {
          email: customer.email,
          text: customer.text,
          scheduled_in_second: offset,
          is_paid: false,
        };
        this.messageSender.sendMessage(message);
      }
    }
  }
}
