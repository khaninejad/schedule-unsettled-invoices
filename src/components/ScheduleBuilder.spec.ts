import {Customer} from './customer';
import {ScheduleBuilder} from './ScheduleBuilder';

describe('Schedule', () => {
  let customers: Customer[];
  let scheduleBuilder: ScheduleBuilder;

  beforeEach(() => {
    customers = [
      new Customer('test@example.com', 'test msg', '0s-18s'),
      new Customer('test2@example.com', 'test msg2', '8s-14s-20s'),
    ];
    scheduleBuilder = new ScheduleBuilder(customers);
  });

  it('builds the message queue', () => {
    expect(scheduleBuilder.getMessages().length).toBe(5);

    const firstCall = scheduleBuilder.getMessages()[0];
    expect(firstCall.email).toBe('test@example.com');
    expect(firstCall.text).toBe('test msg');
    expect(firstCall.scheduled_in_second).toBe(0);

    const lastCall = scheduleBuilder.getMessages()[4];
    expect(lastCall.email).toBe('test2@example.com');
    expect(lastCall.text).toBe('test msg2');
    expect(lastCall.scheduled_in_second).toBe(20);
  });
});
