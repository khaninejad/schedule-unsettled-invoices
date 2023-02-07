import {IMessage} from '@/interfaces/IMessage.interface';
import {CSVReader} from '@/utils/csvReader';
import {ApiClient} from '../utils/api-client';
import {ScheduleBuilder} from './ScheduleBuilder';

export class SchedulingProcess {
  private scheduledMessages: IMessage[] = [];
  public intervalId: ReturnType<typeof setTimeout> = setTimeout(() => {});

  constructor(private readonly csvReader: CSVReader) {}

  async start() {
    console.log('Process has Started');
    this.scheduledMessages = await this.readCsvAndBuildSchedule();
    console.log(
      `Total messages in Queue: ${
        this.scheduledMessages.filter(item => !item.is_paid).length
      }`
    );
    const client = new ApiClient('http://localhost:9090');

    let currentSecond = 0;
    this.intervalId = setInterval(() => {
      this.sendScheduledMessages(currentSecond, client);
      currentSecond++;
      const maxSecond = Math.max(
        ...this.scheduledMessages.map(m => m.scheduled_in_second)
      );
      if (currentSecond > maxSecond) {
        clearInterval(this.intervalId);
        console.warn(
          `Failed Messages: ${
            this.scheduledMessages.filter(item => !item.is_paid).length
          }`
        );
      }
    }, 1000);
  }

  async readCsvAndBuildSchedule(): Promise<IMessage[]> {
    const customers = await this.csvReader.readCustomers();
    const scheduleBuilder = new ScheduleBuilder(customers);
    return scheduleBuilder.getMessages();
  }

  private async sendScheduledMessages(
    currentSecond: number,
    client: ApiClient
  ) {
    for (const message of this.scheduledMessages) {
      if (message.scheduled_in_second === currentSecond) {
        console.log(`Sending message: "${message.text}" to ${message.email}`);
        const response = await client.postMessage(message.email, message.text);
        if (response.data) {
          message.is_paid = response.data.paid as boolean;
        }
        console.log(
          `messages in Queue: ${
            this.scheduledMessages.filter(item => !item.is_paid).length
          }`
        );
      }
    }
  }
}
