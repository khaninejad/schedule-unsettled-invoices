import axios, {AxiosResponse} from 'axios';

export class ApiClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async postMessage(
    email: string,
    text: string
  ): Promise<AxiosResponse> {
    const data = {
      email,
      text,
    };

    return axios.post(`${this.endpoint}/messages`, data);
  }
}
