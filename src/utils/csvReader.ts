import {Customer} from '@/components/customer';
import { ICSVReader } from '@/interfaces/ICSVReader.interface';
import {CSVParser} from './csv-parser';

export class CSVReader implements ICSVReader {
  async readCustomers(): Promise<Customer[]> {
    const csvParser = new CSVParser('./customers.csv');
    return await csvParser.parseCustomers();
  }
}
