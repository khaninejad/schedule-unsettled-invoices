import {IMessage} from '../interfaces/IMessage.interface';
import {IMessageSender} from '../interfaces/IMessageSender.interface';

/**
 * This class is responsible to create a message and return message lists,
 * which also implements IMessageSender to support different types of message
 */
export class MessageSender implements IMessageSender {
  messages: IMessage[] = [];

  sendMessage(message: IMessage): void {
    this.messages.push(message);
  }
  getMessages(): IMessage[] {
    return this.messages;
  }
}
