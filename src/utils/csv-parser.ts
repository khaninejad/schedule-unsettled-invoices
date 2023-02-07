import * as fs from 'fs';
import * as csv from 'csv-parser';
import {Customer} from '../components/customer';

export class CSVParser {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public parseCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      const customers: Customer[] = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data: any) => {
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