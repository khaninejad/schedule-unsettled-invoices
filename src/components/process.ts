import { ApiClient } from "../utils/api-client";
import { CSVParser } from "../utils/csv-parser";
import { Message } from "./message";
import { Schedule } from "./schedule";

export class SchedulingProcess {
  private scheduledMessages: Message[]= [];
  public intervalId: any;

  async start() {
    console.log('Process has Started');
    this.scheduledMessages = await this.readCsvAndBuildSchedule();
    console.log(`Total messages in Queue: ${this.scheduledMessages.filter(item => !item.paid).length}`);
    const client = new ApiClient('http://localhost:9090');

    let currentSecond = 0;
    this.intervalId = setInterval(() => {
      this.sendScheduledMessages(currentSecond, client);
      currentSecond++;
      const maxSecond = Math.max(...this.scheduledMessages.map(m => m.scheduled_in_second));
      if (currentSecond > maxSecond) {
        clearInterval(this.intervalId);
        console.warn(`Failed Messages: ${this.scheduledMessages.filter(item => !item.paid).length}`);
      }
    }, 1000);
  }

  async readCsvAndBuildSchedule(): Promise<Message[]> {
    const csvParser = new CSVParser('./customers.csv');
    const customers = await csvParser.parseCustomers();
    const schedule = new Schedule(customers);
    schedule.buildMessageQueue();
    return schedule.messages;
  }

  private async sendScheduledMessages(currentSecond: number, client: ApiClient) {
    for (const message of this.scheduledMessages) {
      if (message.scheduled_in_second === currentSecond) {
        console.log(`Sending message: "${message.text}" to ${message.email}`);
        const response = await client.postMessage(message.email, message.text);
        if (response.data) {
          message.paid = response.data.paid;
        }
        console.log(`messages in Queue: ${this.scheduledMessages.filter(item => !item.paid).length}`);
      }
    }
  }
}
