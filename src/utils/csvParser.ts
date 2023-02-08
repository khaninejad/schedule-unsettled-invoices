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
  /**
   * this method is responsible to load CSV file and extract customer data and transform it to  CustomerRequestDto
   */
  public parseCustomers(): Promise<ICustomer[]> {
    return new Promise((resolve, reject) => {
      const customers: ICustomer[] = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data: CustomerRequestDto) => {
          // cast stream into dto
          customers.push(new Customer(data.email, data.text, data.schedule));
        })
        .on('end', () => {
          // resolve data after operations has be completed
          resolve(customers);
        })
        .on('error', error => {
          // throw exception on error
          reject(error);
        });
    });
  }
}
