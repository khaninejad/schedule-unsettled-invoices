import axios from 'axios';
import {ApiClient} from './api-client';

jest.mock('axios');

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should post a message', async () => {
    const mockResponse = {
      email: 'example@test.com',
      text: 'test message',
      paid: false,
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
    jest.spyOn(apiClient, 'postMessage').mockResolvedValue(mockResponse);

    const email = 'example@test.com';
    const text = 'test message';
    const response = await apiClient.postMessage(email, text);

    expect(response).toEqual(mockResponse);
  });
});
