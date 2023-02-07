import {Customer} from '@/components/customer';

export interface ICSVReader {
  readCustomers(): Promise<Customer[]>;
}
