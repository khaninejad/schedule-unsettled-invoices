import {Customer} from './customer';

describe('Customer', () => {
  let customer: Customer;

  beforeEach(() => {
    customer = new Customer('example@email.com', 'Hello Example', '8s-14s-20s');
  });

  it('should have an email', () => {
    expect(customer.getEmail()).toBe('example@email.com');
  });

  it('should have a text', () => {
    expect(customer.getText()).toBe('Hello Example');
  });

  it('should have a schedule', () => {
    expect(customer.getSchedule()).toEqual([8, 14, 20]);
  });
  it('should throw an error with an invalid schedule', () => {
    expect(() => {
      new Customer('test@example.com', 'Hello!', 'invalid-schedule');
    }).toThrowError(/Invalid schedule format/);
    expect(() => {
      new Customer('test@example.com', 'Hello!', 'test');
    }).toThrowError(/Invalid schedule format/);
  });
});
