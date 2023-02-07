import {ICSVReader} from '@/interfaces/ICSVReader.interface';
import {ICustomer} from '@/interfaces/ICustomer.interface';
import {CSVParser} from './csvParser';

export class CSVReader implements ICSVReader {
  async readCustomers(): Promise<ICustomer[]> {
    const csvParser = new CSVParser('./customers.csv');
    return await csvParser.parseCustomers();
  }
}
