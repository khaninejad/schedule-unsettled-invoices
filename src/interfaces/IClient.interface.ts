import {CustomerResponseDto} from '@/types/customer.dto';

export interface IApiClient {
  postMessage(email: string, text: string): Promise<CustomerResponseDto>;
}
