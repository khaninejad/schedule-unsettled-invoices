import {IMessage} from './IMessage.interface';

export interface IMessageSender {
  sendMessage(message: IMessage): void;
  getMessages(): IMessage[];
}
