import {Customer} from './customer';

describe('Customer', () => {
  let customer: Customer;

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
});
