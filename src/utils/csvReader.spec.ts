import {CSVParser} from './csvParser';
import {CSVReader} from './csvReader';

describe('CSVReader', () => {
  it('should return array of customers', async () => {
    const csvParserMock = jest.spyOn(CSVParser.prototype, 'parseCustomers');
    csvParserMock.mockResolvedValue([
      {email: 'test1@email.com', text: 'text', schedule: [1]},
      {email: 'test2@email.com', text: 'text2', schedule: [1, 2]},
    ]);
    const csvReader = new CSVReader();
    const customers = await csvReader.readCustomers();
    expect(customers).toEqual([
      {email: 'test1@email.com', text: 'text', schedule: [1]},
      {email: 'test2@email.com', text: 'text2', schedule: [1, 2]},
    ]);
    csvParserMock.mockRestore();
  });
});
