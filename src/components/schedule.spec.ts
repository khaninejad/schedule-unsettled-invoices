import {Customer} from './customer';
import {Schedule} from './schedule';

describe('Schedule', () => {
  let customers: Customer[];
  let schedule: Schedule;

  beforeEach(() => {
    customers = [
      new Customer('test@example.com', 'test msg', '0s-18s'),
      new Customer('test2@example.com', 'test msg2', '8s-14s-20s'),
    ];
    schedule = new Schedule(customers);
  });

  it('builds the message queue', () => {
    schedule.buildMessageQueue();
    expect(schedule.messages.length).toBe(5);

    const firstMessage = schedule.messages[0];
    expect(firstMessage.email).toBe('test@example.com');
    expect(firstMessage.text).toBe('test msg');
    expect(firstMessage.scheduled_in_second).toBe(0);

    const secondMessage = schedule.messages[2];
    expect(secondMessage.email).toBe('test2@example.com');
    expect(secondMessage.text).toBe('test msg2');
    expect(secondMessage.scheduled_in_second).toBe(8);

    const thirdMessage = schedule.messages[4];
    expect(thirdMessage.email).toBe('test2@example.com');
    expect(thirdMessage.text).toBe('test msg2');
    expect(thirdMessage.scheduled_in_second).toBe(20);
  });
});
