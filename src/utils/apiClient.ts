import Config from '../config/config';
import {IApiClient} from '@/interfaces/IClient.interface';
import {CustomerResponseDto} from '@/types/customer.dto';
import axios from 'axios';

export class ApiClient implements IApiClient {
  private endpoint: string;

  constructor() {
    this.endpoint = Config.endpoint;
  }
  /**
   * this method will send a POST method to a external API
   */
  public async postMessage(
    email: string,
    text: string
  ): Promise<CustomerResponseDto> {
    try {
      const data = {
        email,
        text,
      };
      const res = await axios.post(`${this.endpoint}/messages`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
