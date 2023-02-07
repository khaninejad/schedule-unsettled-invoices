import {IMessageSender} from '../interfaces/IMessageSender.interface';
import {Customer} from './customer';
import {Schedule} from './schedule';

describe('Schedule', () => {
  let customers: Customer[];
  let schedule: Schedule;
  let messageSender: jest.Mocked<IMessageSender>;

  beforeEach(() => {
    customers = [
      new Customer('test@example.com', 'test msg', '0s-18s'),
      new Customer('test2@example.com', 'test msg2', '8s-14s-20s'),
    ];
    messageSender = {sendMessage: jest.fn(), getMessages: jest.fn()};
    schedule = new Schedule(customers, messageSender);
  });

  it('builds the message queue', () => {
    schedule.buildMessageQueue();
    expect(messageSender.sendMessage.mock.calls.length).toBe(5);

    const firstCall = messageSender.sendMessage.mock.calls[0][0];
    expect(firstCall.email).toBe('test@example.com');
    expect(firstCall.text).toBe('test msg');
    expect(firstCall.scheduled_in_second).toBe(0);

    const lastCall = messageSender.sendMessage.mock.calls[4][0];
    expect(lastCall.email).toBe('test2@example.com');
    expect(lastCall.text).toBe('test msg2');
    expect(lastCall.scheduled_in_second).toBe(20);
  });
});
