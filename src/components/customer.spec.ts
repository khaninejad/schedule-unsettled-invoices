import {ICustomer} from '@/interfaces/ICustomer.interface';
import {Customer} from './customer';

describe('Customer', () => {
  let customer: ICustomer;

  beforeEach(() => {
    customer = new Customer('example@email.com', 'Hello Example', '8s-14s-20s');
  });

  it('should have an email', () => {
    expect(customer.email).toBe('example@email.com');
  });

  it('should have a text', () => {
    expect(customer.text).toBe('Hello Example');
  });

  it('should have a schedule', () => {
    expect(customer.schedule).toEqual([8, 14, 20]);
  });
  it('should throw an error with an invalid schedule', () => {
    expect(() => {
      new Customer('test@example.com', 'test', 'invalid-schedule');
    }).toThrowError(/Invalid schedule format/);
    expect(() => {
      new Customer('test@example.com', 'test', 'test');
    }).toThrowError(/Invalid schedule format/);
  });
});
