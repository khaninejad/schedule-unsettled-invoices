import * as fs from 'fs';
import {Customer} from '../components/customer';
import {CustomerDto} from '@/types/customer.dto';

import {CSVParser} from './csv-parser';

describe('CSVParser', () => {
  it('should parse customers from a csv file', async () => {
    const filePath = 'customers.csv';
    const customersData: CustomerDto[] = [
      {
        email: 'test1@test.com',
        text: 'this is a message',
        schedule: '8s-14s-20s',
      },
      {
        email: 'test2@test.com',
        text: 'this is a another message',
        schedule: '6s',
      },
    ];
    const expectedCustomers = customersData.map(
      ({email, text, schedule}) => new Customer(email, text, schedule)
    );
    const readStream = {
      pipe: jest.fn(() => readStream),
      on: jest.fn((event, handler) => {
        if (event === 'data') {
          customersData.forEach(data => handler(data));
        }
        if (event === 'end') {
          handler();
        }
        return readStream;
      }),
    };
    jest.spyOn(fs, 'createReadStream').mockReturnValue(readStream);

    const csvParser = new CSVParser(filePath);
    const customers = await csvParser.parseCustomers();

    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
    expect(customers).toEqual(expectedCustomers);
  });

  it('should reject the promise if there is an error', async () => {
    const filePath = 'customers.csv';
    const error = new Error('file not found');
    const readStream = {
      pipe: jest.fn(() => readStream),
      on: jest.fn((event, handler) => {
        if (event === 'error') {
          handler(error);
        }
        return readStream;
      }),
    };
    jest.spyOn(fs, 'createReadStream').mockReturnValue(readStream);

    const csvParser = new CSVParser(filePath);

    try {
      await csvParser.parseCustomers();
      fail('Should throw an error');
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
