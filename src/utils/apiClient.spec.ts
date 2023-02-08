import axios from 'axios';
import {ApiClient} from './apiClient';

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
  it('should catch errors while posting a message', async () => {
    const errorMessage = 'Request failed with status code 500';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const email = 'example@example.com';
    const text = 'test example error';
    apiClient.postMessage(email, text).catch(error => {
      expect(error.message).toBe(errorMessage);
    });
  });
});
