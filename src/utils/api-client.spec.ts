import axios from 'axios';
import {ApiClient} from './api-client';

jest.mock('axios');

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient('http://localhost.com');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should post a message', async () => {
    const mockResponse = {
      data: {
        email: 'example@test.com',
        text: 'test message',
        paid: false,
      },
      status: 201,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const email = 'example@test.com';
    const text = 'test message';
    const response = await apiClient.postMessage(email, text);

    expect(response).toEqual(mockResponse);
    expect(response.data.paid).toEqual(false);
    expect(axios.post).toHaveBeenCalledWith('http://localhost.com/messages', {
      email,
      text,
    });
  });
});
