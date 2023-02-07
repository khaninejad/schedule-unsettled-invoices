import {Customer} from '@/components/customer';
import {CSVParser} from './csv-parser';

export class CSVReader {
  async readCustomers(): Promise<Customer[]> {
    const csvParser = new CSVParser('./customers.csv');
    return await csvParser.parseCustomers();
  }
}
