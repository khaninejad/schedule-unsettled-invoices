import {IMessage} from '../interfaces/IMessage.interface';
import {IMessageSender} from '../interfaces/IMessageSender.interface';

export class MessageSender implements IMessageSender {
  messages: IMessage[] = [];

  sendMessage(message: IMessage): void {
    this.messages.push(message);
  }
  getMessages(): IMessage[] {
    return this.messages;
  }
}
