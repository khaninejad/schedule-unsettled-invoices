import {Customer} from './customer';
import {Message} from './message';

export class Schedule {
  customers: Customer[];
  messages: Message[];

  constructor(customers: Customer[]) {
    this.customers = customers;
    this.messages = [];
  }

  buildMessageQueue(): void {
    for (const customer of this.customers) {
      for (const offset of customer.getSchedule()) {
        const message = new Message(
          customer.getEmail(),
          customer.getText(),
          offset,
          false
        );
        this.addQueue(message);
      }
    }
  }

  private addQueue(message: Message): void {
    this.messages.push(message);
  }
}
