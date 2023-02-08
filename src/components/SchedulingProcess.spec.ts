import {IApiClient} from '../interfaces/IClient.interface';
import {ICSVReader} from '../interfaces/ICSVReader.interface';
import {ApiClient} from '../utils/apiClient';
import {CSVReader} from '../utils/csvReader';
import {SchedulingProcess} from './SchedulingProcess';

jest.mock('./ScheduleBuilder', () => {
  return {
    ScheduleBuilder: jest.fn().mockImplementation(() => {
      return {
        getMessages: jest.fn().mockResolvedValue([
          {
            email: 'test@example.com',
            text: 'test message 1',
            scheduled_in_second: 0,
            is_paid: false,
          },
          {
            email: 'test@example.com',
            text: 'test message 2',
            scheduled_in_second: 1,
            is_paid: false,
          },
          {
            email: 'test@example.com',
            text: 'test message 3',
            scheduled_in_second: 2,
            is_paid: false,
          },
        ]),
      };
    }),
  };
});

jest.mock('../interfaces/IClient.interface', () => {
  return {
    IApiClient: jest.fn().mockImplementation(() => {
      return {
        postMessage: jest.fn().mockResolvedValue({
          paid: true,
        }),
      };
    }),
  };
});

jest.mock('../interfaces/ICSVReader.interface', () => {
  return {
    ICSVReader: jest.fn().mockImplementation(() => {
      return {
        readCustomers: jest.fn().mockResolvedValue([{}, {}, {}]),
      };
    }),
  };
});

describe('SchedulingProcess', () => {
  let csvReader: ICSVReader;
  let apiClient: IApiClient;
  let schedulingProcess: SchedulingProcess;

  beforeEach(() => {
    csvReader = new CSVReader();
    apiClient = new ApiClient();
    schedulingProcess = new SchedulingProcess(csvReader, apiClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the process and send messages on the correct schedule', async () => {
    jest.useFakeTimers();

    const start = jest.spyOn(schedulingProcess, 'start');
    const sendScheduledMessages = jest.spyOn(
      schedulingProcess,
      'sendScheduledMessages'
    );

    await schedulingProcess.start();

    expect(start).toHaveBeenCalledTimes(1);
    expect(sendScheduledMessages).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(sendScheduledMessages).toHaveBeenCalled();
    jest.advanceTimersByTime(4000);
    expect(sendScheduledMessages).toHaveBeenCalledWith(2);
  });
});
