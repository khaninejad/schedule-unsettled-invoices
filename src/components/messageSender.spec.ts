import {IMessage} from '@/interfaces/IMessage.interface';
import {IMessageSender} from '@/interfaces/IMessageSender.interface';
import {MessageSender} from './messageSender';

describe('MessageSender', () => {
  let messageSender: IMessageSender;
  beforeEach(() => {
    messageSender = new MessageSender();
  });

  it('should add message to messages array when sendMessage is called', () => {
    const message: IMessage = {
      email: 'test@example.com',
      text: 'test message',
      is_paid: false,
      scheduled_in_second: 10,
    };
    messageSender.sendMessage(message);
    expect(messageSender.getMessages().length).toBe(1);
    expect(messageSender.getMessages()[0]).toEqual(message);
  });

  it('should return an empty array when getMessages is called and no messages have been sent', () => {
    expect(messageSender.getMessages().length).toBe(0);
  });
});
