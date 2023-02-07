import {IApiClient} from '@/interfaces/IClient.interface';
import {CustomerResponseDto} from '@/types/customer.dto';
import axios from 'axios';

export class ApiClient implements IApiClient {
  private endpoint: string;

  constructor(endpoint?: string) {
    this.endpoint = endpoint ?? 'http://localhost:9090';
  }

  public async postMessage(
    email: string,
    text: string
  ): Promise<CustomerResponseDto> {
    const data = {
      email,
      text,
    };
    const res = await axios.post(`${this.endpoint}/messages`, data);
    return res.data;
  }
}
