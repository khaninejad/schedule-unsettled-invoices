import {IScheduleBuilder} from '../interfaces/IScheduleBuilder.interface';
import {ICustomer} from '../interfaces/ICustomer.interface';
import {IMessageSender} from '../interfaces/IMessageSender.interface';
import {MessageSender} from './messageSender';
import {IMessage} from '@/interfaces/IMessage.interface';

/**
 * this class is responsible to prepare and build message list
 * @implements {IScheduleBuilder}
 */
export class ScheduleBuilder implements IScheduleBuilder {
  private customers: ICustomer[];
  private messageSender: IMessageSender;
  /**
   * class constructor will receive a list of customers and based on schedules will create a message list.
   */
  constructor(customers: ICustomer[]) {
    this.customers = customers;
    this.messageSender = new MessageSender();
    this.buildMessageQueue();
  }
  /**
   * this method will iterate over customers and based on number of schedules will create a message list
   */
  buildMessageQueue(): void {
    for (const customer of this.customers) {
      if (customer.schedule) {
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
  getMessages(): IMessage[] {
    return this.messageSender.getMessages();
  }
}
