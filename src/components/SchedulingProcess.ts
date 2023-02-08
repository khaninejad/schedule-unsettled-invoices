import {IApiClient} from '@/interfaces/IClient.interface';
import {ICSVReader} from '@/interfaces/ICSVReader.interface';
import {IMessage} from '@/interfaces/IMessage.interface';
import {ScheduleBuilder} from './ScheduleBuilder';

export class SchedulingProcess {
  private scheduledMessages: IMessage[] = [];
  public intervalId: ReturnType<typeof setTimeout> = setTimeout(() => {});

  constructor(
    private readonly csvReader: ICSVReader,
    private readonly apiClient: IApiClient
  ) {}

  async start() {
    console.log('Process has Started');
    this.scheduledMessages = await this.readCsvAndBuildSchedule();
    console.log(
      `Total messages in Queue: ${
        this.scheduledMessages.filter(item => !item.is_paid).length
      }`
    );

    let currentSecond = 0;
    this.intervalId = setInterval(() => {
      this.sendScheduledMessages(currentSecond);
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

  async sendScheduledMessages(currentSecond: number) {
    for (const message of this.scheduledMessages) {
      if (message.scheduled_in_second === currentSecond) {
        console.log(`Sending message: "${message.text}" to ${message.email}`);
        const response = await this.apiClient.postMessage(
          message.email,
          message.text
        );
        if (response) {
          message.is_paid = response.paid;
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
