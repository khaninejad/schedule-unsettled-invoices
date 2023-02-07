import {ICustomer} from './ICustomer.interface';

export interface ICSVReader {
  readCustomers(): Promise<ICustomer[]>;
}
