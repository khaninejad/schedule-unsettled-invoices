import {IScheduleBuilder} from '../interfaces/IScheduleBuilder.interface';
import {ICustomer} from '../interfaces/ICustomer.interface';
import {IMessageSender} from '../interfaces/IMessageSender.interface';
import {MessageSender} from './messageSender';
import {IMessage} from '@/interfaces/IMessage.interface';

export class ScheduleBuilder implements IScheduleBuilder {
  private customers: ICustomer[];
  private messageSender: IMessageSender;

  constructor(customers: ICustomer[]) {
    this.customers = customers;
    this.messageSender = new MessageSender();
    this.buildMessageQueue();
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
  getMessages(): IMessage[] {
    return this.messageSender.getMessages();
  }
}
