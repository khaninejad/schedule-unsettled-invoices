import {ICSVReader} from '@/interfaces/ICSVReader.interface';
import {ICustomer} from '@/interfaces/ICustomer.interface';
import {CSVParser} from './csvParser';

export class CSVReader implements ICSVReader {
  /**
   * this method is responsible to extract resolved customer array return list of customers to follow the dependency inversion
   */
  async readCustomers(): Promise<ICustomer[]> {
    const csvParser = new CSVParser('./customers.csv');
    return await csvParser.parseCustomers();
  }
}
