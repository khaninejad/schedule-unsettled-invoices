import {IMessage} from '@/interfaces/IMessage.interface';
import {Message} from './message';

describe('Message', () => {
  let message: IMessage;

  beforeEach(() => {
    message = new Message('example@email.com', 'Hello Example', 5, false);
  });

  it('should have an email', () => {
    expect(message.email).toBe('example@email.com');
  });

  it('should have a text', () => {
    expect(message.text).toBe('Hello Example');
  });
});
