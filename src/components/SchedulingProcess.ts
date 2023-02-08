import {IApiClient} from '@/interfaces/IClient.interface';
import {ICSVReader} from '@/interfaces/ICSVReader.interface';
import {IMessage} from '@/interfaces/IMessage.interface';
import {ScheduleBuilder} from './ScheduleBuilder';

/**
 * this class is responsible for processing message list
 * improvement: this class should have a logger and queue for a failed jobs to schedule another iterations based on the execution plan
 */
export class SchedulingProcess {
  private scheduledMessages: IMessage[] = [];
  // intervalId is used to iterate over time and clear when operations are finished
  public intervalId: ReturnType<typeof setTimeout> = setTimeout(() => {});

  // inject ICSVReader and IApiClient to be used in operations.
  constructor(
    private readonly csvReader: ICSVReader,
    private readonly apiClient: IApiClient
  ) {}
  /**
   * this method is responsible to start the process of sending messages and print the report.
   */
  async start() {
    console.log('Process has Started');
    // read list of messages
    this.scheduledMessages = await this.readCsvAndBuildSchedule();
    console.log(
      `Total messages in Queue: ${
        this.scheduledMessages.filter(item => !item.is_paid).length
      }`
    );

    let currentSecond = 0;
    // based on the message queue will get a maximum second that the app will run without the need to kill the process.
    const maxSecond = Math.max(
      ...this.scheduledMessages.map(m => m.scheduled_in_second)
    );
    // this line will execute sendScheduledMessages for each interval until the maximum interval
    this.intervalId = setInterval(() => {
      this.sendScheduledMessages(currentSecond);
      currentSecond++;
      // when we finished the operation the report will be generated
      if (currentSecond > maxSecond) {
        clearInterval(this.intervalId);
        console.warn(
          `Failed Messages: ${
            this.scheduledMessages.filter(item => item.is_paid).length
          }`
        );
        console.warn(
          `Successful Messages: ${
            this.scheduledMessages.filter(item => !item.is_paid).length
          }`
        );
      }
    }, 1000);
  }
  /**
   *  load customer list using injected csvReader
   * @return {IMessage[]} list of scheduled messages
   */
  async readCsvAndBuildSchedule(): Promise<IMessage[]> {
    const customers = await this.csvReader.readCustomers();
    const scheduleBuilder = new ScheduleBuilder(customers);
    return scheduleBuilder.getMessages();
  }
  /**
   * this method will iterate over messages, based on the current passed interval it will trigger post message
   */
  async sendScheduledMessages(currentSecond: number) {
    for (const message of this.scheduledMessages) {
      // if a message time comes then it will trigger
      // improvement: instead of iteration we could filter the message list and trigger it here
      if (message.scheduled_in_second === currentSecond) {
        // will check to avoid sending multiple post messages in case the customer has already paid their invoices
        if (this.duplicateCheck(this.scheduledMessages, message.email) === 0) {
          console.log(`Sending message to ${message.email}`);
          // send the request using inject apiClient
          const response = await this.apiClient.postMessage(
            message.email,
            message.text
          );
          if (response) {
            message.is_paid = response.paid;
          }
        }
      }
    }
  }
  // this method will check if a customer already paid or not.
  duplicateCheck(message_list: IMessage[], email: string) {
    return message_list.filter(
      item => item.email === email && item.is_paid === true
    ).length;
  }
}
