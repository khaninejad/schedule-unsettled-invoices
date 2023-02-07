import * as fs from 'fs';
import * as csv from 'csv-parser';
import {CustomerRequestDto} from '../types/customer.dto';
import {ICustomer} from '../interfaces/ICustomer.interface';
import {Customer} from '../components/customer';

export class CSVParser {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public parseCustomers(): Promise<ICustomer[]> {
    return new Promise((resolve, reject) => {
      const customers: ICustomer[] = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data: CustomerRequestDto) => {
          customers.push(new Customer(data.email, data.text, data.schedule));
        })
        .on('end', () => {
          resolve(customers);
        })
        .on('error', error => {
          reject(error);
        });
    });
  }
}
