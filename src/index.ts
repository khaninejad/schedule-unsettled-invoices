import { Schedule } from './components/schedule';
import { CSVParser } from './utils/csv-parser';
import { ApiClient } from './utils/api-client';

console.log('Process has Started');

async function readCsvAndBuildSchedule() {
  const csvParser = new CSVParser('./customers.csv');
  const customers = await csvParser.parseCustomers();
  const schedule = new Schedule(customers);
  schedule.buildMessageQueue();
  return schedule.messages;
}

readCsvAndBuildSchedule().then(scheduledMessages => {
  console.log(`Total messages in Queue: ${scheduledMessages.filter(item => !item.paid).length}`);
  const client = new ApiClient('http://localhost:9090');

  const sendScheduledMessages = async (currentSecond: number) => {
    for (const message of scheduledMessages) {
      if (message.scheduled_in_second === currentSecond) {
        console.log(`Sending message: "${message.text}" to ${message.email}`);
        const response = await client.postMessage(message.email, message.text);
        if (response.data) {
          message.paid = response.data.paid;
        }
        console.log(`messages in Queue: ${scheduledMessages.filter(item => !item.paid).length}`);
      }
    }
  };

  let currentSecond = 0;
  const intervalId = setInterval(() => {
    sendScheduledMessages(currentSecond);
    currentSecond++;
    const maxSecond = Math.max(...scheduledMessages.map(m => m.scheduled_in_second));
    if (currentSecond > maxSecond) {
      clearInterval(intervalId);
      console.warn(`Failed Messages: ${scheduledMessages.filter(item => !item.paid).length}`);
    }
  }, 1000);
});